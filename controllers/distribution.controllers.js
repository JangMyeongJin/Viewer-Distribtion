const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);

const distributionController = {};

distributionController.startDistribution = async (req, res) => {
  const { viewerPath, doceyePath } = req.body;

  try {
    // 빌드 실행
    await commandInput("npx gulp generic-legacy", viewerPath);

    // 빌드 완료 상태 전송
    res.write(
      JSON.stringify({ status: "lodding", message: "빌드 완료" }) + "\n"
    );

    // 폴더 복사 실행
    const copyCommand = `xcopy "${viewerPath}\\build\\generic-legacy\\build" "${doceyePath}\\prodoceye-viewer\\src\\main\\resources\\static\\build" /E /I /Y && xcopy "${viewerPath}\\build\\generic-legacy\\web" "${doceyePath}\\prodoceye-viewer\\src\\main\\resources\\static\\web" /E /I /Y`;
    await commandInput(copyCommand);

    // 복사 완료 상태 전송
    res.write(
      JSON.stringify({ status: "success", message: "복사 완료" }) + "\n"
    );

    res.end();
  } catch (error) {
    console.error(`오류 발생: ${error}`);
    res.write(
      JSON.stringify({
        status: "error",
        error: error.cmd
          ? `${error.cmd} 실행 중 오류 발생`
          : "처리 중 오류 발생",
      })
    );
    res.end();
  }
};

const commandInput = async (command, cwd) => {
  try {
    if (cwd) {
      await execPromise(command, { cwd: cwd });
    } else {
      await execPromise(command);
    }
  } catch (error) {
    console.error(`오류 발생: ${error}`);
  }
};

module.exports = distributionController;
