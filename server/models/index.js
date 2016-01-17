class Registry{

}

export default new Registry();

export default (bookshelf)=> {

    var Device = bookshelf.Model.extend({
        tableName: 'device'
    });

};