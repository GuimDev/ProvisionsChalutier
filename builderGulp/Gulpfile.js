const path = require('path'),
	  gulp = require('gulp'),
	  zip = require('gulp-zip'),
	  log = require('fancy-log'),
	  color = require('ansi-colors'),
	  del = require('del'),
	  fs = require('fs'),
	  addonConfig = require('./config.js');

const buildFolderPATH = path.resolve(__dirname, addonConfig.buildFolder),
	  deployFolderPATH = path.resolve(addonConfig.esoAddonDir, addonConfig.modName),
	  archiveFolderPATH = path.resolve(__dirname, addonConfig.archiveFolder),
	  sourceFiles = addonConfig.sourceFiles.map((str) => str.replace(/\//g, path.sep)),
	  outputBuildFolder = path.resolve(buildFolderPATH, addonConfig.modName);

process.chdir(path.resolve(__dirname, "../"));

const cleanBuild = () => del([
	buildFolderPATH,
]);

const cleanDeploy = () => del([
	deployFolderPATH,
], {force: true});

const generateBuild = () => 
	gulp.src(sourceFiles)
		.pipe(gulp.dest(outputBuildFolder))
;

const generateDeploy = () => 
	gulp.src(outputBuildFolder + path.sep + "**")
		.pipe(gulp.dest(deployFolderPATH))
;

const generateArchive = () =>  
	gulp.src(buildFolderPATH + path.sep + "**")
		.pipe(zip(`${addonConfig.modName}_${getVersion()}.zip`))
		.pipe(gulp.dest(archiveFolderPATH))
;

function getFileContent(filename) {
	return fs.readFileSync(filename).toString();
}

function indexesIn(str, pattern) {
	const result = [];
	for (let i = 0; i < str.length; ++i)
		if (str.substring(i, i + pattern.length) == pattern)
			result.push(i);

	return result;
}

function getVersion() {
	const txtFile = getFileContent(addonConfig.modName + ".txt");

	const version = (txtFile.match(/\n\#\# Version\: (\d{1,3}\.\d{1,3}\.\d{1,3}[a-z]?)/) || [])[1];

	if (!version) {
		log("Bad version in header of " + addonConfig.modName + ".txt");
		process.exit();
	}

	for (let i = 0, content, match, file; i < addonConfig.filesWithVersionNumber.length; i++) {
		file = addonConfig.filesWithVersionNumber[i];
		content = getFileContent(file[0]);
		match = indexesIn(content, version) || [];
		if (match.length !== file[1]) {
			log(`Error: Version not find. ${file[0]} ${match.length}/${file[1]}`);
			log(`Current version: ${version}`);
			process.exit();
		}
	}

	return version;
}

function watchDeploy() {
	const watcher = gulp.watch(sourceFiles);

	watcher.on("change", function(path, stats) {
		log(`Change detected '${color.cyan(path)}'`);
		gulp.src(path)
			.pipe(gulp.dest(outputBuildFolder))
			.pipe(gulp.dest(deployFolderPATH));
	});
}

gulp.task("clean", cleanBuild);
gulp.task("clean-deploy", cleanDeploy);

gulp.task("build", gulp.series(cleanBuild, generateBuild));
gulp.task("deploy", gulp.series("build", cleanDeploy, generateDeploy));
gulp.task("archive", gulp.series("build", generateArchive));

gulp.task("watch-deploy", gulp.series("deploy", watchDeploy));