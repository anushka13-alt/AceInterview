import Docker from "dockerode";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const docker = new Docker();

const LANGUAGE_IMAGES: Record<string, string> = {
  cpp: "aceinterview-runner:latest",
};

const LANGUAGE_COMMANDS: Record<string, string> = {
  cpp: "g++ main.cpp -std=c++17 -o main && ./main < input.txt",
};

/*
 * Converts:
 *
 * watchTimes = [1, 3, 5, 4, 7], k = 3
 *
 * into:
 *
 * vector<int> watchTimes = {1,3,5,4,7};
 * int k = 3;
 */
function parsePrimeVideoInput(input: string) {
  const arrayMatch = input.match(
    /watchTimes\s*=\s*\[([^\]]*)\]/i
  );

  const kMatch = input.match(
    /\bk\s*=\s*(\d+)/i
  );

  if (!arrayMatch || !kMatch) {
    return null;
  }

  const values = arrayMatch[1]
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .map(Number);

  const k = Number(kMatch[1]);

  if (
    values.length === 0 ||
    values.some((x) => !Number.isFinite(x)) ||
    !Number.isInteger(k)
  ) {
    return null;
  }

  return {
    values,
    k,
  };
}

/*
 * If the user submitted only the function,
 * automatically create the required C++ wrapper.
 */
function prepareCppCode(
  sourceCode: string,
  input: string
) {
  const hasMain = /\bint\s+main\s*\(/.test(
    sourceCode
  );

  // User already supplied complete C++ program
  if (hasMain) {
    return sourceCode;
  }

  // Currently supported function-based problem
  const primeVideoInput =
    parsePrimeVideoInput(input);

  if (primeVideoInput) {
    const { values, k } = primeVideoInput;

    const cppArray =
      values.join(", ");

    return `
#include <bits/stdc++.h>
using namespace std;

${sourceCode}

int main() {

    vector<int> watchTimes = {${cppArray}};
    int k = ${k};

    cout << boolalpha
         << hasMilestone(watchTimes, k);

    return 0;
}
`;
  }

  /*
   * If the input cannot be converted into a
   * supported function-test format, leave the
   * original code untouched so the compiler
   * can report the actual problem.
   */
  return sourceCode;
}

export async function execute(
  language: string,
  sourceCode: string,
  stdin: string = ""
) {
  const normalized = language.toLowerCase();

  if (!sourceCode?.trim()) {
    throw new Error("Source code is empty");
  }

  if (!LANGUAGE_IMAGES[normalized]) {
    throw new Error(
      `Unsupported language: ${language}`
    );
  }

  const id = uuid();

  const tempDir = path.join(
    process.cwd(),
    "temp",
    id
  );

  fs.mkdirSync(tempDir, {
    recursive: true,
  });

  let finalSourceCode = sourceCode;

  /*
   * IMPORTANT:
   * Function-only C++ submissions are wrapped
   * with includes + main automatically.
   */
  if (normalized === "cpp") {
    finalSourceCode = prepareCppCode(
      sourceCode,
      stdin
    );
  }

  fs.writeFileSync(
    path.join(tempDir, "main.cpp"),
    finalSourceCode
  );

  fs.writeFileSync(
    path.join(tempDir, "input.txt"),
    stdin || ""
  );

  let container: Docker.Container | null = null;

  try {
    console.log(
      "========== LOCAL DOCKER EXECUTION =========="
    );

    console.log(
      "Language:",
      normalized
    );

    console.log(
      "Container:",
      LANGUAGE_IMAGES[normalized]
    );

    console.log(
      "Input:",
      stdin
    );

    console.log(
      "Function wrapper:",
      !/\bint\s+main\s*\(/.test(sourceCode)
    );

    console.log(
      "============================================"
    );

    container =
      await docker.createContainer({
        Image:
          LANGUAGE_IMAGES[normalized],

        WorkingDir: "/app",

        Cmd: [
          "bash",
          "-c",
          LANGUAGE_COMMANDS[normalized],
        ],

        HostConfig: {
          Binds: [
            `${tempDir}:/app`,
          ],

          Memory:
            256 * 1024 * 1024,

          NanoCpus:
            1000000000,

          AutoRemove: false,
        },

        Tty: false,

        AttachStdout: true,

        AttachStderr: true,
      });

    await container.start();

    const result =
      await container.wait();

    const logs =
      await container.logs({
        stdout: true,
        stderr: true,
      });

    const output = logs
      .toString("utf8")
      .replace(
        /[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g,
        ""
      )
      .trim();

    console.log(
      "========== EXECUTION RESULT =========="
    );

    console.log(output);

    console.log(
      "======================================"
    );

    /*
     * Docker returns exit code 0 when program
     * successfully compiles and executes.
     */
    if (result.StatusCode !== 0) {
      return {
        stdout: "",
        stderr: output,
        compile_output: output,
        message: "Compilation or runtime error",

        status: {
          id: 6,
          description: "Compilation Error",
        },

        time: null,
        memory: null,
      };
    }

    return {
      stdout: output,
      stderr: "",
      compile_output: "",
      message: "",

      status: {
        id: 3,
        description: "Accepted",
      },

      time: null,
      memory: null,
    };

  } catch (error: any) {

    console.error(
      "Docker execution error:",
      error
    );

    throw new Error(
      error?.message ||
      "Code execution failed"
    );

  } finally {

    if (container) {
      try {
        await container.remove({
          force: true,
        });
      } catch {}
    }

    fs.rmSync(tempDir, {
      recursive: true,
      force: true,
    });
  }
}