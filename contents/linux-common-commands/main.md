1. Show directory size

    ```bash
    root@mylinux:~/myproject$ du -sh node_modules/
    488M    node_modules/
    ```

2. Display amount of free and used memory in the system

    ```bash
    root@mylinux:~$ free -h
                  total        used        free      shared  buff/cache   available
    Mem:           1.9G        195M        1.0G        692K        720M        1.5G
    Swap:            0B          0B          0B
    ```

3. Add system wide environment variable

    ```bash
    sudo nano /etc/environment
    ```

    Add a new variable on each line using the syntax: `VARNAME=VALUE`, reboot to take effect.

4. Show and set time zone

    Show your current time zone:

    ```bash
    timedatectl
    ```

    List available time zones:

    ```bash
    timedatectl list-timezones
    ```

    Change time zone:

    ```bash
    sudo timedatectl set-timezone your_time_zone
    ```
