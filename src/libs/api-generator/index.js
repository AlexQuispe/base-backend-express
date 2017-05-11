
  //console.log(model.rawAttributes);

  /*model.describe().then(function (schema) {
    return Object.keys(schema).filter(function(field){
        return schema[field].primaryKey;
    });
  }).tap(console.log);*/


  /*model.describe().then(function (schema) {
    return Object.keys(schema);
  }).tap(console.log);*/

  console.log("PK = ", model.primaryKeyAttribute);
  console.log("PK Field = ", model.primaryKeyField);
  console.log("VIRTUAL Atribs = ", model._virtualAttributes);
  console.log("Name = ", model.name);
  console.log("Atributes = ", model.attributes);
  console.log("Asociations = ", model.associations);
  console.log("timestampAttributes = ", model._timestampAttributes);
  console.log("OPTIONS = ", model.options);
  console.log("Table Atributes = ", model.tableAttributes);


  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
