const sequelize = require('./db')
const {Model, DataTypes} = require('sequelize')

class Profile extends Model{
    static async findUser(username, petname){
        try{
            const user = await User.findByPk(username);
            if(user && user.petname === petname){
                return user;
            }else{
                return null;
            }
        }catch(error){
            console.log(error);
            return null;
        }
    }
}

Profile.init({
    username:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    petname:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Profile'
})

module.exports = Profile