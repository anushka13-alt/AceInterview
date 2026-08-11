import Docker from "dockerode";

const docker = new Docker();

export async function runCpp(code: string) {
  const container = await docker.createContainer({
    Image: "gcc:13",
    Cmd: [
      "bash",
      "-c",
      `
      echo '${code.replace(/'/g, "'\\''")}' > main.cpp &&
      g++ main.cpp -o main &&
      ./main
      `,
    ],
    Tty: false,
    AttachStdout: true,
    AttachStderr: true,
  });

  await container.start();

  const stream = await container.logs({
    stdout: true,
    stderr: true,
    follow: true,
  });

  const output = stream.toString();

  await container.remove({ force: true });

  return output;
}