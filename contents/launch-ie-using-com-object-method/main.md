1. To launch IE using COM Object method, we can choose any of following approaches:

    - Using **PowerShell**: Open a PowerShell prompt and run the command `New-Object -ComObject "InternetExplorer.Application";$ie.Visible=1`, this will open an Internet Explorer window with a blank page.

        ![](https://joji.blob.core.windows.net/recipe/launch-ie-using-com-object-method-1.png)

    - Using **VBScript**

        1. Save the following code `launch-ie.vbs`
            ```vb
            Set IE = WScript.CreateObject("InternetExplorer.Application")
            IE.Visible = True
            ```
        2. Open a command prompt or PowerShell prompt, navigate to the folder where you saved `launch-ie.vbs` and run the command `wscript launch-ie.vbs`.

            ![](https://joji.blob.core.windows.net/recipe/launch-ie-using-com-object-method-2.png)

    - Using the **Internet Properties** diaglog

        1. Press the `Win key + R` or right click on the **Start Menu** and choose **Run** to launch a **Run** dialog. Then run `inetcpl.cpl` to open **Internet Properties**.

            ![](https://joji.blob.core.windows.net/recipe/clear-ie-cache-1.png)

        2. Go to the **Programs** tab and click on the **Manage add-ons** button.
        3. In the **Manage Add-ons** dialog, click on the link **Learn more about toolbars and extensions** in the lower left corner, this will launch an Internet Explorer window using the COM Object method.

            ![](https://joji.blob.core.windows.net/recipe/launch-ie-using-com-object-method-3.png)