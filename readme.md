Responsive-HTML-Tables
==================

Along with its stylesheet, this plugin adds to the table, the attributes necessary to render it responsive.


##Gulp tasks

####Build (default task)
```
> gulp
```
This task processes (compile sass files, generate the map files, minimizes styles and scripts) all files on **\src\** folder, and copies the result to the **\dist\** folder.

####Build the demo page
```
> gulp build-demo
```
This task processes all files on **\src\** folder in the same way as the build task do, and copies the results _*.min.*_ files to the **\demo\** folder.

####Demo
```
> gulp demo
```
This task processes do the same as the **build-demo** task, and then launch the demo page in the default browser with **browser-sync**, and  keep monitoring the **\src\** folder for changes in order to reload the demo page.
