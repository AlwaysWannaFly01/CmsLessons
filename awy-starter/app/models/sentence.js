import {Sequelize, Model} from 'sequelize';
import sequelize from '../libs/db';

class Sentence extends Model {

}

Sentence.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: {
            type: Sequelize.STRING(64)
        },
        content: {
            type: Sequelize.STRING(300),
            allowNull: true
        },
        url:{
            type: Sequelize.STRING(100),
            allowNull: true
        },
        pubdate: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        fav_nums: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        title: {
            type: Sequelize.STRING(50)
        },
        type: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.INTEGER
        },
    },
    {
        //定义表明
        tableName: 'sentence',
        //定义模型名称
        modelName: 'sentence',
        paranoid: true,
        underscored:true,
        //自动导入时间
        timeStamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        sequelize
    }
)

export {Sentence as SentenceModel}
