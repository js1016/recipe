1. Launch a command prompt as administrator to ensure that you get both user and computer policy settings.
2. To gather the group policy result for the current user, run the following command: `gpresult /h report.html`
3. To gather the group policy result for a different user of Windows, run the following command: `gpresult /user [<targetdomain>\]<targetuser>] /h report.html` (Example: `gpresult /user contoso.com\testuser /h report.html`).
4. Wait until the command completes. The group policy result HTML: `report.html` can be found in the current working directory.
