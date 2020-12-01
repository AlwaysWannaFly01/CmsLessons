import {LinRouter} from 'lin-mizar';
import {groupRequired} from "../../middleware/jwt";
import {logger} from '../../middleware/logger';
import {AddFlowValidator} from '../../validators/flow'
import {FlowDao} from "../../dao/flow";
import {FlowService} from "../../service/flow";

const flowApi = new LinRouter({
    prefix: '/v1/flow'
});

flowApi.linPost(
    'addFlow',//标识
    '/',
    {
        permission: '添加最新期刊',
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

flowApi.get('/', async ctx => {
    //1.flow
    //2.根据结果里面的art_id,type字段查询相应类型的期刊内容
    //3.格式化数据
    //4.返回数据
    const flowList = await FlowService.getFlowList()
    ctx.json(flowList)
})


module.exports = {
    flowApi
}
