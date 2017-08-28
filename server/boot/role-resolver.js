'use strict';

module.exports = function(app) {
  var AppAdmin = app.models.AppAdmin;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  AppAdmin.find({}, function(err, adminRes) {
    if (err) {
      console.log('%j', err);
      return err;
    }
    console.log('res value');
    console.log(adminRes);

    if (adminRes.length > 0) {
      Role.create({
        name: 'admin'
      }, function(err, role) {
        if (err) {
          console.log('%j', err);
          return err;
        }
        console.log('Role');
        console.log(role);

        for (var i = 0; i < adminRes.length; i++) {
          // Make an admin
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: adminRes[i].id
          }, function(err, principal) {
            if (err) {
              console.log('%j', err);
              return err;
            }
            console.log(principal);
          });
          // Make an admin
        }

      });
    }

  });
};
