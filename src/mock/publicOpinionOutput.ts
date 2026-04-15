export type OutputTone = '正向' | '中性' | '负向'
export type OutputFormat = '短帖' | '长文导语' | '问答口径' | '短视频脚本' | '标题方案' | '图文卡片'
export type SampleType = '虚构演示样本' | '风险样本' | '回应样本'
export type RiskLevel = '低' | '中' | '高'

export interface OutputItem {
  id: number
  tone: OutputTone
  format: OutputFormat
  sampleType: SampleType
  riskLevel: RiskLevel
  title: string
  content: string
  tags: string[]
  scenario: string
}

export interface PublicOpinionTopicPackage {
  keyword: string
  aliases: string[]
  summary: string
  notice: string
  availableTones: OutputTone[]
  availableFormats: OutputFormat[]
  items: OutputItem[]
}

export const meiIranOutputPackage: PublicOpinionTopicPackage = {
  keyword: '美伊冲突',
  aliases: ['美伊局势', '美以袭击伊朗', '霍尔木兹海峡'],
  summary: '围绕美伊冲突构建的前端比赛演示专题，用于展示不同舆论倾向、不同内容形式和不同风险等级下的素材编排能力。',
  notice: '以下内容均为虚构演示样本，仅用于比赛前端功能展示，不用于真实传播。',
  availableTones: ['正向', '中性', '负向'],
  availableFormats: ['短帖', '长文导语', '问答口径', '短视频脚本', '标题方案', '图文卡片'],
  items: [
    { id: 1, tone: '正向', format: '短帖', sampleType: '回应样本', riskLevel: '低', title: '把关注点放回降温本身', content: '【虚构演示】停火信号出现后，最值得关注的不是情绪对抗，而是局势是否真的朝着降温和谈的方向移动。', tags: ['停火', '降温', '演示'], scenario: '微博短帖' },
    { id: 2, tone: '正向', format: '短帖', sampleType: '回应样本', riskLevel: '低', title: '理性看待局势变化', content: '【虚构演示】面对国际冲突，保持理性判断比情绪宣泄更重要，先看事实、再看影响、最后看趋势。', tags: ['理性', '事实', '趋势'], scenario: '评论区回复' },
    { id: 3, tone: '正向', format: '短帖', sampleType: '回应样本', riskLevel: '低', title: '关注和平窗口是否扩大', content: '【虚构演示】每一次局势缓和都意味着和平窗口可能被打开，真正值得放大的，是各方能否继续坐回谈判桌。', tags: ['和平', '谈判', '窗口'], scenario: '社区发帖' },
    { id: 4, tone: '正向', format: '短帖', sampleType: '回应样本', riskLevel: '低', title: '讨论应减少极端措辞', content: '【虚构演示】越是敏感议题，越需要压低极端化表达，让公共讨论回到信息与判断，而不是标签化对立。', tags: ['讨论', '表达', '降噪'], scenario: '热榜评论' },
    { id: 5, tone: '中性', format: '短帖', sampleType: '虚构演示样本', riskLevel: '低', title: '停火不代表风险清零', content: '【虚构演示】停火只是阶段性变化，不代表核问题、海峡风险和地区安全矛盾已经同步解除。', tags: ['停火', '风险', '中性'], scenario: '话题卡片配文' },
    { id: 6, tone: '中性', format: '短帖', sampleType: '虚构演示样本', riskLevel: '低', title: '油价为何总被提及', content: '【虚构演示】中东局势变化会迅速影响油价预期，因为市场会先评估运输通道和供应稳定性。', tags: ['油价', '预期', '能源'], scenario: '知识贴' },
    { id: 7, tone: '中性', format: '短帖', sampleType: '虚构演示样本', riskLevel: '低', title: '看局势要看三条线', content: '【虚构演示】观察美伊冲突，不能只看战场消息，还要看外交进展、能源市场和地区盟友动向。', tags: ['战场', '外交', '盟友'], scenario: '热点解读' },
    { id: 8, tone: '负向', format: '短帖', sampleType: '风险样本', riskLevel: '高', title: '停火只是表象的样本', content: '【虚构风险样本】表面停火并不能掩盖下一轮对抗可能正在酝酿，舆论场最容易在这时被再次点燃。', tags: ['风险', '反转', '舆论升温'], scenario: '风险模拟贴' },
    { id: 9, tone: '负向', format: '短帖', sampleType: '风险样本', riskLevel: '高', title: '市场焦虑扩散样本', content: '【虚构风险样本】一旦海峡安全预期转弱，市场恐慌会比真实变化更快扩散，带动讨论全面转负。', tags: ['市场焦虑', '海峡', '扩散'], scenario: '风险情绪样本' },
    { id: 10, tone: '负向', format: '短帖', sampleType: '风险样本', riskLevel: '中', title: '协议真假争议样本', content: '【虚构风险样本】停火文本若出现分歧，舆论将迅速转向“协议是否有效”的质疑叙事。', tags: ['协议', '质疑', '样本'], scenario: '负向传播模拟' },

    { id: 11, tone: '正向', format: '长文导语', sampleType: '回应样本', riskLevel: '低', title: '和平窗口导语', content: '【虚构演示】在冲突反复的地区局势中，任何降温迹象都值得被认真观察。与其放大对立情绪，不如持续关注停火是否能转化为更稳定的谈判机制。', tags: ['长文', '和平窗口', '谈判'], scenario: '专题导语' },
    { id: 12, tone: '正向', format: '长文导语', sampleType: '回应样本', riskLevel: '低', title: '理性叙事导语', content: '【虚构演示】国际热点最容易把复杂现实压缩成简单情绪，但真正有价值的讨论，应该建立在信息核实、长期影响和地区稳定这三个维度上。', tags: ['理性', '核实', '稳定'], scenario: '评论文章开头' },
    { id: 13, tone: '中性', format: '长文导语', sampleType: '虚构演示样本', riskLevel: '低', title: '结构性矛盾导语', content: '【虚构演示】美伊冲突之所以反复升温，不只是某一次打击或某一份声明造成的，而是历史、安全、能源和核问题长期叠加的结果。', tags: ['结构性', '历史', '核问题'], scenario: '深度稿导语' },
    { id: 14, tone: '中性', format: '长文导语', sampleType: '虚构演示样本', riskLevel: '低', title: '停火脆弱性导语', content: '【虚构演示】停火往往只能暂时压低战场强度，却未必能同步压低各方底线，这也是局势总在缓和与紧张之间摇摆的原因。', tags: ['停火', '脆弱性', '底线'], scenario: '专题页开头' },
    { id: 15, tone: '负向', format: '长文导语', sampleType: '风险样本', riskLevel: '高', title: '风险预期导语', content: '【虚构风险样本】如果公众普遍相信停火无法持续，那么接下来舆论更容易围绕“下一次升级何时发生”展开。', tags: ['风险预期', '升级', '导语'], scenario: '负向样本导语' },
    { id: 16, tone: '负向', format: '长文导语', sampleType: '风险样本', riskLevel: '中', title: '情绪外溢导语', content: '【虚构风险样本】当战争话题外溢到油价、航运和市场情绪，公众对远方冲突的感知会快速转成现实焦虑。', tags: ['情绪外溢', '油价', '焦虑'], scenario: '风险专题导语' },

    { id: 17, tone: '正向', format: '问答口径', sampleType: '回应样本', riskLevel: '低', title: '问：公众该关注什么？', content: '【虚构演示】答：更应关注局势是否继续降温、谈判是否延续，以及对能源和地区稳定会产生什么长期影响。', tags: ['问答', '公众关注', '长期影响'], scenario: '答问模板' },
    { id: 18, tone: '正向', format: '问答口径', sampleType: '回应样本', riskLevel: '低', title: '问：为什么强调理性讨论？', content: '【虚构演示】答：因为复杂国际议题如果只剩情绪表达，就很难看见事实、风险和真正值得追踪的变化。', tags: ['问答', '理性讨论', '事实'], scenario: '评论区口径' },
    { id: 19, tone: '中性', format: '问答口径', sampleType: '虚构演示样本', riskLevel: '低', title: '问：为什么停火后还在热搜？', content: '【虚构演示】答：因为停火解决的是“暂时不打”，但没有解决“为什么打、会不会再打、谁来执行”的核心问题。', tags: ['热搜', '停火', '核心问题'], scenario: '知识问答' },
    { id: 20, tone: '中性', format: '问答口径', sampleType: '虚构演示样本', riskLevel: '低', title: '问：为什么油价会跟着波动？', content: '【虚构演示】答：因为市场担心的是未来供应和运输安全，而不只是眼前已经发生的变化。', tags: ['油价', '市场', '供应'], scenario: '财经问答' },
    { id: 21, tone: '负向', format: '问答口径', sampleType: '风险样本', riskLevel: '高', title: '问：为什么舆论会迅速转负？', content: '【虚构风险样本】答：因为一旦出现反转消息，公众会把“停火预期”迅速改写成“失控预期”，情绪落差会放大传播。', tags: ['反转', '情绪落差', '风险'], scenario: '风险问答样本' },

    { id: 22, tone: '正向', format: '短视频脚本', sampleType: '回应样本', riskLevel: '低', title: '一分钟讲理性观察', content: '【虚构演示】开场：国际热点上来先别急着站队。主体：先看有没有停火信号，再看谈判有没有延续，最后看市场是否稳定。结尾：复杂问题，最好分层判断。', tags: ['视频', '理性', '判断'], scenario: '口播脚本' },
    { id: 23, tone: '正向', format: '短视频脚本', sampleType: '回应样本', riskLevel: '低', title: '一分钟讲和平窗口', content: '【虚构演示】开场：为什么局势缓和值得关注？主体：因为每一次降温都可能成为谈判重新启动的前提。结尾：比起情绪升级，更该看和平窗口是否被真正打开。', tags: ['和平窗口', '视频脚本', '降温'], scenario: '短视频' },
    { id: 24, tone: '中性', format: '短视频脚本', sampleType: '虚构演示样本', riskLevel: '低', title: '一分钟讲霍尔木兹', content: '【虚构演示】开场：为什么霍尔木兹海峡总被提起？主体：因为它连接着全球能源运输安全。结尾：所以地区局势一变，市场情绪马上就会跟着变。', tags: ['霍尔木兹', '能源', '视频'], scenario: '知识视频' },
    { id: 25, tone: '中性', format: '短视频脚本', sampleType: '虚构演示样本', riskLevel: '低', title: '一分钟讲停火后的焦点', content: '【虚构演示】开场：为什么停火后讨论没停？主体：因为大家开始追问协议真假、执行情况和下一步谈判。结尾：这就是热点从战场转向舆论的过程。', tags: ['停火后', '热点', '协议'], scenario: '复盘视频' },
    { id: 26, tone: '负向', format: '短视频脚本', sampleType: '风险样本', riskLevel: '高', title: '一分钟讲风险反转', content: '【虚构风险样本】开场：为什么一句新消息能让情绪立刻掉头？主体：因为舆论最怕预期被推翻。结尾：一旦停火信号失真，负向传播会明显提速。', tags: ['反转', '负向传播', '预期'], scenario: '风险脚本样本' },

    { id: 27, tone: '正向', format: '标题方案', sampleType: '回应样本', riskLevel: '低', title: '标题：局势降温时，更需要把讨论拉回事实', content: '适合用于回应型内容首页标题。', tags: ['标题', '事实', '回应'], scenario: '文章标题' },
    { id: 28, tone: '正向', format: '标题方案', sampleType: '回应样本', riskLevel: '低', title: '标题：比情绪更重要的，是判断局势有没有真正缓和', content: '适合用于理性向图文封面。', tags: ['标题', '缓和', '判断'], scenario: '封面标题' },
    { id: 29, tone: '中性', format: '标题方案', sampleType: '虚构演示样本', riskLevel: '低', title: '标题：停火之外，真正需要看的还有哪三件事？', content: '适合用于分析型内容。', tags: ['标题', '分析', '三件事'], scenario: '专题标题' },
    { id: 30, tone: '中性', format: '标题方案', sampleType: '虚构演示样本', riskLevel: '低', title: '标题：为什么一场地区冲突会牵动全球油价？', content: '适合配财经与能源视角内容。', tags: ['标题', '油价', '财经'], scenario: '资讯标题' },
    { id: 31, tone: '负向', format: '标题方案', sampleType: '风险样本', riskLevel: '中', title: '标题：停火是真转折，还是下一轮升级前的短暂停顿？', content: '适合用于风险研判类样本展示。', tags: ['标题', '升级', '风险研判'], scenario: '风险专题标题' },

    { id: 32, tone: '正向', format: '图文卡片', sampleType: '回应样本', riskLevel: '低', title: '卡片：少一点情绪，多一点核实', content: '【虚构演示】主文案：复杂国际议题先核实再判断；副文案：理性传播比情绪放大更有价值。', tags: ['卡片', '核实', '理性'], scenario: '图文卡片' },
    { id: 33, tone: '正向', format: '图文卡片', sampleType: '回应样本', riskLevel: '低', title: '卡片：真正值得关注的是和平机制', content: '【虚构演示】主文案：停火只是开始；副文案：更关键的是后续谈判机制能否被延续。', tags: ['卡片', '和平机制', '谈判'], scenario: '轮播图卡' },
    { id: 34, tone: '中性', format: '图文卡片', sampleType: '虚构演示样本', riskLevel: '低', title: '卡片：三秒看懂海峡风险为何牵动市场', content: '【虚构演示】主文案：关键运输通道影响全球预期；副文案：局势一变，油价与航运率先反应。', tags: ['卡片', '海峡', '市场'], scenario: '知识卡片' },
    { id: 35, tone: '中性', format: '图文卡片', sampleType: '虚构演示样本', riskLevel: '低', title: '卡片：停火后的常见舆论走向', content: '【虚构演示】主文案：追问真假、关注执行、转向经济影响；副文案：这是热点进入第二阶段的典型表现。', tags: ['卡片', '舆论走向', '第二阶段'], scenario: '复盘图卡' },
    { id: 36, tone: '负向', format: '图文卡片', sampleType: '风险样本', riskLevel: '高', title: '卡片：风险情绪如何被迅速放大', content: '【虚构风险样本】主文案：反转消息最容易引爆负向情绪；副文案：预期落差会带动扩散速度明显上升。', tags: ['卡片', '风险情绪', '扩散'], scenario: '风险图卡' },
  ],
}

export const publicOpinionOutputPackages: PublicOpinionTopicPackage[] = [meiIranOutputPackage]
