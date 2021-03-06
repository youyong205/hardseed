function WriteIniVisible(isVisible)
{
   fso   = new ActiveXObject('Scripting.FileSystemObject');

   rfile = fso.OpenTextFile('proxy.ini', 1);
   content = rfile.ReadAll();
   rfile.Close()

   content = content.replace(/visible\s*=[^\r]*/ig, 'visible = ' + isVisible);

   wfile = fso.OpenTextFile('proxy.ini', 2);
   wfile.Write(content);
   wfile.Close();
}

function CreateShortcut(target_path)
{
   wsh = new ActiveXObject('WScript.Shell');
   link = wsh.CreateShortcut(wsh.SpecialFolders("Startup") + '\\goagent.lnk');
   link.TargetPath = target_path;
   link.Arguments = '"' + wsh.CurrentDirectory + '\\proxy.py"';
   link.WindowStyle = 7;
   link.Description = 'GoAgent';
   link.WorkingDirectory = wsh.CurrentDirectory;
   link.Save();
}

function main()
{
   wsh = new ActiveXObject('WScript.Shell');
   fso = new ActiveXObject('Scripting.FileSystemObject');

   if(wsh.Popup('是否将goagent.exe加入到启动项？(本对话框6秒后消失)', 6, 'GoAgent 对话框', 1+32) == 1) {
       if(wsh.Popup("是否显示托盘区图标？", 5, "GoAgent 对话框", 1+32) == 1) {
          CreateShortcut('"' + wsh.CurrentDirectory + '\\goagent.exe"');
       } else {
          CreateShortcut('"' + wsh.CurrentDirectory + '\\python27.exe"');
       }
       WriteIniVisible('0');
       wsh.Popup('成功加入GoAgent到启动项', 5, 'GoAgent 对话框', 64);
   }
}

main();
