# usage: in git bash, input 'sh update.sh' - windows; or in terminal input './update.sh' and click approve git for windows pop up to run it
# usage: in terminal, input 'bash update.sh' to run it
# usage: note that the quotation marks should not be input into the terminal

echo '--------upload files start--------'   
# enter the target folder
# cd ./

# git init
git add .
git status
git commit -m 'auto update hsc'
echo '--------commit successfully--------'


git push -f git@github.com:Shichuan-Hao/lowflow-design.git dev1.0
# git push
# git push -f git@github.com:Shichuan-Hao/byteswalk.git/ main
# git push -u git@github.com:Shichuan-Hao/byteswalk.git/ main
# git remote add origin git@github.com:Shichuan-Hao/byteswalk.git/
# git push -u origin main
echo '--------push to GitHub successfully--------'