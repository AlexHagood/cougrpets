const { getItemByID } = require("./items")
const sequelize = require('../db')
const {Model, DataTypes, QueryTypes} = require('sequelize')

tempInventory = {1:1, 2:3}

let idDic = {0:"blackLentil", 1:"redLentil", 2:"greenLentil", 3:"chicken"}

class Inventory extends Model{
    // static async findInventory(username){
        
    // }

    static async getInventory(username)
    {
        //Returns a object, {itemID: Quantity}
        //return tempInventory
        //console.log("Locating the inventory of user "+username);
        try{
            const inventory = await Inventory.findByPk(username);
            console.log(username + " has the following inventory: " + JSON.stringify(inventory, null, 4))
            if(inventory){
                return inventory;
                //return tempInventory;
            }else{
                return null;
            }
        }catch(error){
            console.log(error);
            return null;
        }
    }

    // converts {ID: Quantity, ...} form to a array of all items.
    static async unpackInventory(username)
    {
        let unpacked = []
        const inventory = await Inventory.findOne({
            where: {username : username}
        })
        for (let key in idDic){
            console.log(idDic[key]);
            let quantity = inventory[idDic[key]];
            for(let i = 0; i < quantity; i++){
                unpacked.push(getItemByID(key))
            }
        }
        return unpacked;
    }

    static async addItem(username, itemId)
    {

        let invQuery = "SELECT " + idDic[itemId] + " FROM 'Inventories' WHERE username = '" + username + "';";
        const result = await sequelize.query(invQuery, {
            type: QueryTypes.SELECT,
            });
        //console.log(JSON.stringify(result, null, 4))
        let quantity = result[0][idDic[itemId]];
        quantity ++;
        invQuery = "UPDATE 'Inventories' SET " + idDic[itemId] + " = " + quantity + " WHERE username = '" + username + "'";
        await sequelize.query(invQuery, {
            type: QueryTypes.UPDATE,
          });
        // This function should add an item to the user inventory DB!!
    }

    static async popItem(username, itemId)
    {

        Inventory.findOne({
            where: {username : username}

        })
        .then(inventory => {
            if (inventory) {
                inventory.decrement(idDic[itemId], {by : 1});
            } else {
                console.log(`Inventory for user ${username} not found...`);
            }
        })
        .catch(error => {
            console.error("Error updating inventory:", error);
        })


        // TEMPORARY
        
        // let invQuery = "SELECT " + idDic[itemId] + " FROM 'Inventories' WHERE username = '" + username + "'";
        // const result = await sequelize.query(invQuery, {
        //     type: QueryTypes.SELECT,
        //     });

        

        // //console.log(JSON.stringify(result, null, 4))
        // let quantity = result[0][idDic[itemId]];
        // if (quantity > 0)
        // {
        //     quantity --;
        //     invQuery = "UPDATE 'Inventories' SET " + idDic[itemId] + " = " + quantity + " WHERE username = '" + username + "'";
        //     await sequelize.query(invQuery, {
        //         type: QueryTypes.UPDATE,
        //     });
        // } else {
        //     console.log("How did you do that!?")
        // }



        // Subtract 1 from the respective itemID's quantity!
    }
}

Inventory.init({
    username:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    blackLentil:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    redLentil:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    greenLentil:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chicken:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Inventory'
})

module.exports = Inventory

