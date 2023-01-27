@echo off
ECHO These commands will enable tracing:
@echo on

logman create trace "wdag" -ow -o wdag.etl -p "Microsoft-Windows-WDAG-PolicyEvaluator-CSP" 0xffffffffffffffff 0xff -nb 16 16 -bs 1024 -mode Circular -f bincirc -max 4096 -ets
logman update trace "wdag" -p "Microsoft-Windows-WDAG-PolicyEvaluator-GP" 0xffffffffffffffff 0xff -ets
logman update trace "wdag" -p "Microsoft-Windows-WDAG-Filter" 0xffffffffffffffff 0xff -ets
logman update trace "wdag" -p "Microsoft-Windows-WDAG-Manager" 0xffffffffffffffff 0xff -ets
logman update trace "wdag" -p "Microsoft-Windows-WDAG-Service" 0xffffffffffffffff 0xff -ets
logman update trace "wdag" -p "Microsoft-Windows-WDAG-TrustWorkflowMgr" 0xffffffffffffffff 0xff -ets
logman update trace "wdag" -p {63665931-A4EE-47B3-874D-5155A5CFB415} 0xffffffffffffffff 0xff -ets

@echo off
echo
ECHO Reproduce your issue and enter any key to stop tracing
@echo on
pause
logman stop "wdag" -ets