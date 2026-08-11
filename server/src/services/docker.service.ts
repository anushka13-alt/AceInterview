import Docker from "dockerode";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const docker = new Docker();

export async function runCpp(
  code: string,
  input: string = ""
) {
  const id = uuid();

  const dir = path.join(
    process.cwd(),
    "temp",
    id
  );

  fs.mkdirSync(dir, {
    recursive: true,
  });

  /*
   * AceInterview uses LeetCode-style code.
   * User writes only the Solution class/function.
   *
   * We automatically provide:
   * - bits/stdc++.h
   * - using namespace std
   */

  const wrappedCode = `
#include <bits/stdc++.h>
using namespace std;

${code}

int main() {

    vector<int> watchTimes = {1, 3, 5, 4, 7};
    int k = 3;

    Solution solution;

    cout << boolalpha
         << solution.hasMilestone(watchTimes, k);

    return 0;
}
`;

  fs.writeFileSync(
    path.join(dir, "main.cpp"),
    wrappedCode
  );

  fs.writeFileSync(
    path.join(dir, "input.txt"),
    input
  );

  let container: Docker.Container | null = null;

  try {

    container = await docker.createContainer({

      Image: "aceinterview-runner:latest",

      WorkingDir: "/app",

      Cmd: [
        "bash",
        "-c",
        "g++ main.cpp -o main && ./main < input.txt"
      ],

      HostConfig: {

        Binds: [
          `${dir}:/app`
        ],

        Memory: 256 * 1024 * 1024,

        CpuShares: 256,

        AutoRemove: false

      }

    });

    await container.start();

    await container.wait();

    const logBuffer = await container.logs({
      stdout: true,
      stderr: true
    });

    const output = logBuffer
      .toString("utf8")
      .replace(
        /[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g,
        ""
      )
      .trim();

    await container.remove({
      force: true
    });

    fs.rmSync(dir, {
      recursive: true,
      force: true
    });

    return output;

  } catch (err) {

    if (container) {

      try {
        await container.remove({
          force: true
        });
      } catch {}

    }

    fs.rmSync(dir, {
      recursive: true,
      force: true
    });

    throw err;
  }
}