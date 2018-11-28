# Dependencies
- [Node.js](https://nodejs.org) - Follow link to install for your platform
- [Gulp-cli](https://yarnpkg.com/) - To use `gulp` command. Install Gulp-cli after Node.js with `npm install gulp-cli -g`

# Configure
See '[config.js](./config.js)' for available configurations.
 - `modName`: Name of the mod. (duh)
 - `defaultBuildFolder`: Destination for 'built' addon files.
 - `archiveFolder`: Destination for zip.
 - `sourceFiles`: Provides the list of files to be deployed. New files that should be included with the addon need to be added to the list.
 - `filesWithVersionNumber`: Provides the list of files which contain version number. Gulp will alert you if you forgot to update version in your file.
 - `esoAddonDir`: Specifies where to deploy game files. It looks to see if the `ESO_ADDONS_PATH` environment variable is set.

 Set `ESO_ADDONS_PATH` environment variable to `C:\Users\YOUR-NAME\Documents\Elder Scrolls Online\live\AddOns` (replace `YOUR-NAME`).

# Available commands

1. `gulp build`
   - Copy addon files to 'build' directory specified in [config.js](./config.js).
2. `gulp deploy` 
   - Build and copy files from 'build' folder into the folder defined in `esoAddonDir` in [config.js](config.js).
3. `gulp archive` 
   - Build and ZIP files from 'build' folder in `archiveFolder` in [config.js](config.js).

