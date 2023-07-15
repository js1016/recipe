1. After the Application Pool crashes, open **DebugDiag 2 Collection**. You can check whether the **Userdump Count** has increased to confirm whether the crash dump was successfully captured. Then, you can find the corresponding crash dump file in the userdump path.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-12.png)

2. After obtaining the crash dump, if you no longer want to use this rule, you can right-click on the rule and choose **Remove Rule** to remove it, or **Deactivate Rule** to disable it but keep the settings for future use.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-13.png)
