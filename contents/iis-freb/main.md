1. ref:open-iis-manager
2. In the Connection panel on the right side, select the web site for which you want to enable **Failed Request Tracing**. Then, double-click on **Failed Request Tracing Rules** in the middle panel to access the settings page.

    ![](https://joji.blob.core.windows.net/recipe/iis-freb-2.png)

3. Click on **Add** in the Actions panel on the right side to add a new tracing rule.

    ![](https://joji.blob.core.windows.net/recipe/iis-freb-3.png)

4. Here, you can configure the tracing rule to target specific content:

    ![](https://joji.blob.core.windows.net/recipe/iis-freb-4.png)

    - Select "All content (\*)" to trace all traffic for the site.
    - Select "ASP.NET (\*.aspx)" to trace requests for all \*.aspx pages under the site.
    - Select "ASP (\*.asp)" to trace requests for all \*.asp pages under the site.
    - You can also input a custom URL pattern. For example, you can enter `/testpath/\*.html` to trace requests for all HTML pages under the "testpath" path of the site, such as `http://localhost/testpath/index.html`.

5. Next, you can choose the trigger conditions for the tracing rule. You can set it to trigger based on a specific status code or a range of status codes. Alternatively, you can set it to trigger when the HTTP response time taken exceeds a certain duration.

    ![](https://joji.blob.core.windows.net/recipe/iis-freb-7.png)

6. This page contains default settings to ensure that the tracing log includes sufficient diagnostic information. You can keep the default settings.

    ![](https://joji.blob.core.windows.net/recipe/iis-freb-5.png)

7. After clicking **Finish**, you will see the tracing rule added to the rule list. You can follow the above steps to add multiple tracing rules.

8. To enable **Failed Request Tracing** for the site, you need to click on **Edit Site Tracing...** in the Actions panel on the right side. Then, select **Enable** to activate all the configured tracing rules. Here, you can also choose the log file location for **Failed Request Tracing**. Remember this path for future reference when viewing the Failed Request Tracing logs. You can also set the maximum number of trace files, which is initially set to 50. This means that after exceeding 50 log files, the oldest log file will be deleted.

    ![](https://joji.blob.core.windows.net/recipe/iis-freb-6.png)

9. Next, please use a web browser or an HTTP client to access the relevant web site URL to trigger the tracing rules.
