import {LinRouter} from 'lin-mizar';
import {groupRequired} from "../../middleware/jwt";
import {logger} from '../../middleware/logger';
import {AddFlowValidator, EditFlowValidator, DeleteFlowValidator} from '../../validators/flow'
import {FlowDao} from "../../dao/flow";
import {FlowService} from "../../service/flow";

const flowApi = new LinRouter({
    prefix: '/v1/flow'
});

/**
 *新增最新期刊
 */
flowApi.linPost(
    'addFlow',//标识
    '/',
    {
        permission: '新增最新期刊',
        module: '最新期刊管理',
        mount: true
    },
    groupRequired,
    logger("{user.username}新增了最新期刊"),
    async (ctx) => {
        //1.参数校验
        const v = await new AddFlowValidator().validate(ctx)
        //2.执行业务逻辑
        await FlowDao.createFlow(v)
        //3.插入数据库
        //4.返回成功
        ctx.success({
            msg: '最新期刊内容新增成功'
        })
    });
/**
 *最新期刊列表查询
 */
flowApi.get('/', async ctx => {
    //1.flow
    //2.根据结果里面的art_id,type字段查询相应类型的期刊内容
    //3.格式化数据
    //4.返回数据
    const flowList = await FlowService.getFlowList()
    ctx.json(flowList)
})
/**
 *最新期刊列表编辑
 */
flowApi.linPut(
    'editFlow',
    '/:id',
    {
        permission: '编辑最新期刊列表',
        module: '最新期刊管理',
        mount: true
    },
    groupRequired,
    logger("{user.username}编辑了最新期刊"),
    async ctx => {
        const v = await new EditFlowValidator().validate(ctx);
        const id = v.get('path.id');
        const index = v.get('body.index');
        const type = v.get('body.type');
        const art_id = v.get('body.art_id');
        const status = v.get('body.status');

        await FlowDao.editFlow(id, index, type, art_id, status)
        ctx.success({
            msg: '最新期刊列表编辑成功'
        })
    }
)
/**
 *最新期刊列表删除
 */

flowApi.linDelete(
    'deleteFlow',
    '/:id',
    {
        permission: '删除最新期刊列表内容',
        module: '内容管理',
        mount: true
    },
    groupRequired,
    logger("{user.username}删除了最新期刊内容"),
    async ctx => {
        const v = await new DeleteFlowValidator().validate(ctx)
        await FlowDao.deleteFlow(v.get('path.id'))
        ctx.success({
            msg: "最新期刊列表内容删除成功"
        })
    }
)

module.exports = {
    flowApi
}
