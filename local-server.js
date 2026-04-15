import express from 'express';
import cors from 'cors';
import axios from 'axios';
// 💡 必须引入这两个模块，否则读取本地 JSON 会导致服务崩溃！
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3300;

app.use(cors());
app.use(express.json());

// ============================================================================
// 🌟 核心网关配置
// ============================================================================
const USE_REAL_BACKEND = false;
const REAL_BACKEND_BASE_URL = 'http://10.0.0.88:8080/api';

async function proxyToAgent(req, res, targetEndpoint) {
  if (!USE_REAL_BACKEND) {
    console.log(`[开发模式] ${req.path} -> 拦截请求，触发前端 LOCAL_MOCK_DATA`);
    return res.status(500).json({ status: 'mock', message: '本地开发模式：触发兜底' });
  }
  try {
    const targetUrl = `${REAL_BACKEND_BASE_URL}${targetEndpoint}`;
    console.log(`[网关转发] 请求真实 Agent: ${targetUrl}`);
    const response = await axios.post(targetUrl, req.body, { timeout: 15000 });
    
    const data = response.data;
    if (!data || (Array.isArray(data) && data.length === 0) || (typeof data === 'object' && Object.keys(data).length === 0)) {
      return res.status(500).json({ status: 'invalid', message: 'Agent 返回无效数据' });
    }
    return res.json({ status: 'ok', data: data });
  } catch (error) {
    console.error(`[转发失败] Agent 异常: ${targetEndpoint}`, error.message);
    return res.status(500).json({ status: 'error', message: `Agent 异常：${error.message}` });
  }
}

// ============================================================================
// 🔍 本地数据库检索接口 (修复版：防崩溃 + 标准格式返回)
// ============================================================================
app.post('/monitor/search-events', (req, res) => {
  try {
    // 兼容不同的参数命名
    const keyword = req.body.keyword || req.body.q || '';
    if (!keyword) {
      return res.json({ status: 'ok', data: [] });
    }

    // 使用绝对路径，防止启动目录不同导致找不到文件
    const dbPath = path.join(process.cwd(), 'src/mock/events.json');

    if (!fs.existsSync(dbPath)) {
      console.warn(`[本地搜索] 警告：找不到数据库文件 ${dbPath}`);
      return res.json({ status: 'ok', data: [] });
    }

    const events = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    
    // 模糊匹配逻辑
    const results = events.filter(e =>
      (e.title && e.title.includes(keyword)) || 
      (e.summary && e.summary.includes(keyword)) || 
      (e.content && e.content.includes(keyword))
    );

    console.log(`[本地搜索] 关键字 "${keyword}" 找到 ${results.length} 条结果`);
    
    // 💡 必须包裹在 data 里面，遵循前端解包契约！
    return res.json({ status: 'ok', data: results });

  } catch (error) {
    console.error('[本地搜索] 代码执行异常:', error);
    // 报错也要优雅返回空数组，防止前端白屏
    return res.json({ status: 'error', data: [] }); 
  }
});

// ============================================================================
// 🚀 常规路由映射
// ============================================================================
app.post('/dashboard/index', (req, res) => proxyToAgent(req, res, '/agent/dashboard'));

app.post('/analysis/portrait', (req, res) => proxyToAgent(req, res, '/agent/portrait'));
app.post('/analysis/sentiment', (req, res) => proxyToAgent(req, res, '/agent/sentiment'));
app.post('/analysis/opinion', (req, res) => proxyToAgent(req, res, '/agent/opinion'));
app.post('/analysis/time-spatial', (req, res) => proxyToAgent(req, res, '/agent/time-spatial'));
app.post('/analysis/history-compare', (req, res) => proxyToAgent(req, res, '/agent/history-compare'));
app.post('/analysis/multi-modal', (req, res) => proxyToAgent(req, res, '/agent/multi-modal'));
app.post('/analysis/policy', (req, res) => proxyToAgent(req, res, '/agent/policy'));

app.post('/monitor/event-overview', (req, res) => proxyToAgent(req, res, '/monitor/event-overview'));
app.post('/monitor/overview', (req, res) => proxyToAgent(req, res, '/monitor/overview'));
app.post('/monitor/hot-topics', (req, res) => proxyToAgent(req, res, '/monitor/hot-topics'));
app.post('/monitor/stream', (req, res) => proxyToAgent(req, res, '/monitor/stream'));
app.post('/monitor/topic-detail', (req, res) => proxyToAgent(req, res, '/monitor/topic-detail'));

app.post('/security/overview', (req, res) => proxyToAgent(req, res, '/security/overview'));
app.post('/security/threat-detect', (req, res) => proxyToAgent(req, res, '/agent/threat-detect'));
app.post('/security/rumor-detect', (req, res) => proxyToAgent(req, res, '/security/rumor-detect'));
app.post('/security/map', (req, res) => proxyToAgent(req, res, '/security/map'));

app.post('/trace/overview', (req, res) => proxyToAgent(req, res, '/trace/overview'));
app.post('/trace/spread-path', (req, res) => proxyToAgent(req, res, '/trace/spread-path'));
app.post('/trace/source-trace', (req, res) => proxyToAgent(req, res, '/trace/source-trace'));
app.post('/trace/spread-map', (req, res) => proxyToAgent(req, res, '/trace/spread-map'));

app.post('/warning/overview', (req, res) => proxyToAgent(req, res, '/warning/overview'));
app.post('/warning/alerts', (req, res) => proxyToAgent(req, res, '/warning/alerts'));
app.post('/warning/rules', (req, res) => proxyToAgent(req, res, '/warning/rules'));
app.post('/warning/rules/save', (req, res) => proxyToAgent(req, res, '/warning/rules/save'));
app.post('/warning/report-preview', (req, res) => proxyToAgent(req, res, '/warning/report-preview'));

app.post('/agent/overview', (req, res) => proxyToAgent(req, res, '/agent/overview'));
app.post('/agent/list', (req, res) => proxyToAgent(req, res, '/agent/list'));
app.post('/agent/logs', (req, res) => proxyToAgent(req, res, '/agent/logs'));

app.post('/data-collection/overview', (req, res) => proxyToAgent(req, res, '/data-collection/overview'));
app.post('/data-collection/tasks', (req, res) => proxyToAgent(req, res, '/data-collection/tasks'));
app.post('/data-collection/tasks/create', (req, res) => proxyToAgent(req, res, '/data-collection/tasks/create'));
app.post('/data-collection/distribution/time', (req, res) => proxyToAgent(req, res, '/data-collection/distribution/time'));
app.post('/data-collection/distribution/spatial', (req, res) => proxyToAgent(req, res, '/data-collection/distribution/spatial'));

app.listen(port, () => {
  console.log(`\n=== 极简网关已启动: http://localhost:${port} ===`);
  console.log(`状态: ${USE_REAL_BACKEND ? '🟢 转发真实 Agent' : '🟡 未连 Agent，依赖前端兜底'}\n`);
});