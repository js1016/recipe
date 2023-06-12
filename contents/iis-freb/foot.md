1. ref:iis-site-id
2. Open **File Explorer** and navigate to the path where Failed Request Tracing logs are stored. You may notice multiple folders starting with `W3SVC` followed by a number. Select the folder that ends with the site ID you obtained earlier. For example, if the site ID is **2**, choose the W3SVC**2** directory. Once inside the directory, ensure that it contains the failed request tracing XML files and the `freb.xsl` file. To obtain all the latest failed request tracing logs, compress the entire directory into a ZIP file.

    ![](https://joji.blob.core.windows.net/recipe/iis-freb-8.png)
