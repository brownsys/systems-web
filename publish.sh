#!/bin/bash

# Silly direct publishing script
#
# This script will publish your local build of the site to the
# webserver.  To use it, you must have 1) access to systems-v3, 2)
# membership in the www-data group on systems-v3, and 3) an
# ~/.ssh/config entry for systems-v3 called "systems-v3".  If you
# intend to run this script from outside the CS network, you must also
# include an entry to use the department SSH gateway, such as the
# following:
#
# Host browncs
#    HostName pk-ssh.cs.brown.edu
#    User <YOUR USER>
#    IdentityFile ~/.ssh/id_rsa
#
# Host systems-v2
#    HostName systems-v3.cs.brown.edu
#    User <YOUR USER>
#    IdentityFile ~/.ssh/id_rsa
#    ProxyCommand ssh browncs -W %h:%p
#
# Note:  If you have issues, make sure you can connect to pk-ssh.cs.brown.edu
# manually.  Using this server requires you have a cached Kerberos ticket, which
# may require you to ssh to ssh.cs.brown.edu manually first.
#
# Note: running this script will overwrite any changes or extra files
# in the webserver's directory for the site without warning.

set -euo pipefail
BUNDLE=/usr/bin/bundle

${BUNDLE} exec jekyll clean
${BUNDLE} exec jekyll build --strict_front_matter

rsync -avz --update --delete --chmod=D775,F774 --progress _site/* systems-v3:/vol/web/html/systems

