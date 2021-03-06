import {Sequelize, Model} from 'sequelize';
import sequelize from '../libs/db';
import {config} from 'lin-mizar';

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
            type: Sequelize.STRING(64),
            get() {
                const image = this.getDataValue('image');
                /*app/config/settings  在项目中快速获取某个具体配置参数*/
                return config.getItem('localMainImgUrlPrefix') + image;
            }
        },
        content: {
            type: Sequelize.STRING(300),
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
        //这意味着偏执表会执行记录的 软删除,而不是 硬删除;当你调用 destroy 方法时,将发生软删除
        paranoid: true,
        underscored: true,
        //自动导入时间
        timeStamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        sequelize
    }
)

export {Sentence as SentenceModel}
