const Table=require('./Table');

class Department  extends Table{

    constructor(connection,tableName){
        super(connection,tableName);
        this.columns=["id","name"];
    }
}


module.exports=Department;