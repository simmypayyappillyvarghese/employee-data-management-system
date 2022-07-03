const Table=require('./Table');

//Class for Department Table
class Department  extends Table{

    constructor(connection,tableName){
        super(connection,tableName);
        this.columns=["id","name"];
    }
}


module.exports=Department;