const defaultBuildFolder = "build";

const addonConfig = {
    modName: "ProvisionsChalutier",
    buildFolder: defaultBuildFolder,
    archiveFolder: "archive",

    // Set addon directory in environment vars or set default above. Mine is set to "C:\\Users\\Mike\\Documents\\Elder Scrolls Online\\live\\AddOns"
    esoAddonDir: process.env["ESO_ADDONS_PATH"] || defaultBuildFolder,
    sourceFiles: [
        "textures/icon_dds/**",
        "Chalutier.lua",
        "chalutier_low.jpg",
        "header.lua",
        "ProvisionsChalutier.txt",
        "README.md"
    ],
    filesWithVersionNumber: [
        ["ProvisionsChalutier.txt", 2],
        ["README.md", 1],
        ["header.lua", 1]
    ]
};

module.exports = addonConfig;

function getFileContent(filename) {
    return fs.readFileSync(filename).toString();
}
