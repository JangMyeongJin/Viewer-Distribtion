const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);

const distributionController = {};

distributionController.startDistribution = async (req, res) => {
  const { viewerPath, doceyePath } = req.body;

  try {
    res.write(
      JSON.stringify({
        status: "lodding",
        message: "npx gulp generic-legacy 명령어 입력",
      }) + "\n"
    );

    // 빌드 실행
    await commandInput("npx gulp generic-legacy", viewerPath);

    // 빌드 완료 상태 전송
    res.write(
      JSON.stringify({
        status: "lodding",
        message: "generic-legacy 빌드 완료",
      }) + "\n"
    );

    // 폴더 복사 실행
    const copyBuildCommand = `xcopy "${viewerPath}\\build\\generic-legacy\\build" "${doceyePath}\\prodoceye-viewer\\src\\main\\resources\\static\\build" /E /I /Y && xcopy "${viewerPath}\\build\\generic-legacy\\web" "${doceyePath}\\prodoceye-viewer\\src\\main\\resources\\static\\web" /E /I /Y`;
    await commandInput(copyBuildCommand);

    // 복사 완료 상태 전송
    res.write(
      JSON.stringify({
        status: "lodding",
        message: "prodoceye-viewer build,web 배포 완료",
      }) + "\n"
    );

    const copyHtmlCommand = `xcopy "${doceyePath}\\prodoceye-viewer\\src\\main\\resources\\static\\web\\viewer.html" "${doceyePath}\\prodoceye-viewer\\src\\main\\resources\\templates\\viewer\\viewer.html" /Y`;
    await commandInput(copyHtmlCommand);

    // viewer.html 파일 복사 후 삭제
    const deleteCommand = `del "${doceyePath}\\prodoceye-viewer\\src\\main\\resources\\static\\web\\viewer.html" /F`;
    await commandInput(deleteCommand);

    // 복사 완료 상태 전송
    res.write(
      JSON.stringify({
        status: "lodding",
        message: "prodoceye-viewer viewer.html 배포 완료",
      }) + "\n"
    );

    const copyManagerBuildCommand = `xcopy "${viewerPath}\\build\\generic-legacy\\build" "${doceyePath}\\prodoceye\\src\\main\\resources\\static\\build" /E /I /Y && xcopy "${viewerPath}\\build\\generic-legacy\\web" "${doceyePath}\\prodoceye\\src\\main\\resources\\static\\web" /E /I /Y`;
    await commandInput(copyManagerBuildCommand);

    res.write(
      JSON.stringify({
        status: "lodding",
        message: "prodoceye build,web 배포 완료",
      }) + "\n"
    );

    const copyManagerHtmlCommand = `xcopy "${doceyePath}\\prodoceye\\src\\main\\resources\\static\\web\\viewer.html" "${doceyePath}\\prodoceye\\src\\main\\resources\\templates\\viewer\\viewer.html" /Y`;
    await commandInput(copyManagerHtmlCommand);

    // viewer.html 파일 복사 후 삭제
    const deleteManagerHtmlCommand = `del "${doceyePath}\\prodoceye\\src\\main\\resources\\static\\web\\viewer.html" /F`;
    await commandInput(deleteManagerHtmlCommand);

    res.write(
      JSON.stringify({
        status: "lodding",
        message: "prodoceye viewer.html 배포 완료",
      }) + "\n"
    );

    // 빌드 완료 상태 전송
    res.write(
      JSON.stringify({ status: "success", message: "빌드 완료" }) + "\n"
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
