# NoteBookList 后端接口文档（前端缺失）

本文档覆盖当前前端页面所需的后端接口，便于后端补齐实现并与前端联调。

**版本**: v1  
**Base URL**: `/api/v1`  
**鉴权方式**: `Authorization: Bearer <access_token>`  
**时间格式**: ISO 8601，例如 `2026-02-06T10:00:00Z`

**通用返回结构**
```json
{
  "code": 0,
  "message": "ok",
  "data": {}
}
```

**错误码**
- 0 成功
- 400 参数错误
- 401 未登录或 token 失效
- 403 无权限
- 404 资源不存在
- 409 资源冲突
- 422 校验失败
- 500 服务器错误

**分页约定**
- Query: `page` `page_size`
- Response: `items` `page` `page_size` `total`

**资源字段约定**
- `id` 统一为字符串
- `image_url` 为可直接访问的图片地址
- `tags` 为字符串数组

---

**1. 鉴权 Auth**

| 方法 | 路径 | 说明 | 鉴权 |
| --- | --- | --- | --- |
| POST | `/auth/login` | 登录（邮箱/手机号 + 密码） | 否 |
| POST | `/auth/signup` | 注册 | 否 |
| POST | `/auth/refresh` | 刷新令牌 | 否 |
| POST | `/auth/logout` | 退出登录 | 是 |
| GET | `/auth/me` | 获取当前用户 | 是 |

**登录请求**
```json
{
  "identifier": "user@example.com",
  "password": "********"
}
```

**登录响应**
```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "access_token": "jwt-access",
    "refresh_token": "jwt-refresh",
    "expires_in": 7200,
    "user": {
      "id": "u_1",
      "name": "Elena Fisher",
      "username": "elena_learns",
      "avatar_url": "https://...",
      "level": 12
    }
  }
}
```

---

**2. 用户与个人中心**

| 方法 | 路径 | 说明 | 鉴权 |
| --- | --- | --- | --- |
| GET | `/users/me` | 个人信息 | 是 |
| PATCH | `/users/me` | 更新个人信息 | 是 |
| GET | `/users/me/stats` | 统计数据（课程数/完成率/学习时长） | 是 |
| GET | `/users/me/plan` | 当前计划与空间 | 是 |
| GET | `/users/me/settings` | 隐私/通知/AI 设定 | 是 |
| PATCH | `/users/me/settings` | 更新设置 | 是 |
| GET | `/users/me/moods` | 心情记录 | 是 |
| POST | `/users/me/moods` | 记录今日心情 | 是 |
| GET | `/notifications` | 通知列表 | 是 |
| POST | `/notifications/read-all` | 全部已读 | 是 |
| POST | `/notifications/{id}/read` | 单条已读 | 是 |

**用户信息模型**
| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | string | 用户 ID |
| name | string | 显示名 |
| username | string | 用户名 |
| avatar_url | string | 头像 |
| level | number | 等级 |
| verified | boolean | 认证标记 |

---

**3. 首页 Dashboard**

| 方法 | 路径 | 说明 | 鉴权 |
| --- | --- | --- | --- |
| GET | `/dashboard` | 首页汇总数据 | 是 |

**首页响应示例**
```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "greeting": "Good morning",
    "user": { "id": "u_1", "name": "Alex", "avatar_url": "https://..." },
    "weekly_insight": {
      "progress_percent": 100,
      "title": "Weekly Insight",
      "description": "Spanish Vocabulary targets crushed!"
    },
    "today_focus": [
      { "id": "t_1", "title": "Python Chapter 4", "status": "learning", "eta_minutes": 45 },
      { "id": "t_2", "title": "Project Outline", "status": "urgent", "due_at": "2026-02-07T12:00:00Z" }
    ],
    "recent_notes": [
      { "id": "n_1", "title": "Neural Networks 101", "type": "note", "updated_at": "2026-02-06T08:00:00Z" }
    ]
  }
}
```

---

**4. 笔记 Notes**

| 方法 | 路径 | 说明 | 鉴权 |
| --- | --- | --- | --- |
| GET | `/note-folders` | 文件夹列表 | 是 |
| POST | `/note-folders` | 新建文件夹 | 是 |
| PATCH | `/note-folders/{id}` | 更新文件夹 | 是 |
| DELETE | `/note-folders/{id}` | 删除文件夹 | 是 |
| GET | `/notes` | 笔记列表（筛选/排序） | 是 |
| POST | `/notes` | 新建笔记 | 是 |
| GET | `/notes/{id}` | 笔记详情 | 是 |
| PATCH | `/notes/{id}` | 更新笔记 | 是 |
| DELETE | `/notes/{id}` | 删除笔记 | 是 |
| POST | `/notes/{id}/bookmark` | 书签切换 | 是 |
| POST | `/notes/{id}/ai/summary` | AI 摘要 | 是 |
| POST | `/notes/{id}/ai/extract` | AI 提取要点 | 是 |
| POST | `/notes/{id}/ai/quiz` | AI 生成测验 | 是 |

**笔记模型**
| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | string | 笔记 ID |
| title | string | 标题 |
| subtitle | string | 副标题 |
| folder_id | string | 文件夹 |
| tags | string[] | 标签 |
| cover_image_url | string | 封面 |
| content_blocks | array | 结构化内容 |
| summary | string | AI 摘要 |
| bookmarked | boolean | 是否收藏 |
| updated_at | string | 更新时间 |

**创建笔记请求**
```json
{
  "title": "Neural Networks",
  "subtitle": "Intro 101",
  "folder_id": "f_1",
  "tags": ["DeepLearning", "Algorithms"],
  "cover_image_url": "https://...",
  "content_blocks": [
    { "type": "paragraph", "text": "Neural networks are..." },
    { "type": "code", "language": "python", "code": "def perceptron(x, w, b): ..." }
  ]
}
```

---

**5. Prompt 管理**

| 方法 | 路径 | 说明 | 鉴权 |
| --- | --- | --- | --- |
| GET | `/prompt-categories` | 分类列表 | 是 |
| GET | `/prompts` | Prompt 列表（搜索/分类/收藏） | 是 |
| POST | `/prompts` | 新建 Prompt | 是 |
| GET | `/prompts/{id}` | Prompt 详情 | 是 |
| PATCH | `/prompts/{id}` | 更新 Prompt | 是 |
| DELETE | `/prompts/{id}` | 删除 Prompt | 是 |
| POST | `/prompts/{id}/favorite` | 收藏切换 | 是 |
| POST | `/prompts/{id}/run` | 记录使用次数 | 是 |

**Prompt 模型**
| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | string | Prompt ID |
| title | string | 标题 |
| category | string | 分类 |
| content | string | Prompt 内容 |
| tags | string[] | 标签 |
| favorite | boolean | 是否收藏 |
| usage_count | number | 使用次数 |

---

**6. 项目 Projects**

| 方法 | 路径 | 说明 | 鉴权 |
| --- | --- | --- | --- |
| GET | `/projects` | 项目列表 | 是 |
| POST | `/projects` | 新建项目 | 是 |
| GET | `/projects/{id}` | 项目详情 | 是 |
| PATCH | `/projects/{id}` | 更新项目 | 是 |
| DELETE | `/projects/{id}` | 删除项目 | 是 |
| GET | `/projects/{id}/tasks` | 任务列表 | 是 |
| POST | `/projects/{id}/tasks` | 新建任务 | 是 |
| PATCH | `/projects/{id}/tasks/{task_id}` | 更新任务 | 是 |
| DELETE | `/projects/{id}/tasks/{task_id}` | 删除任务 | 是 |
| POST | `/projects/{id}/tasks/{task_id}/toggle` | 勾选任务 | 是 |
| GET | `/projects/{id}/resources` | 资源列表 | 是 |
| POST | `/projects/{id}/resources` | 新增资源 | 是 |
| DELETE | `/projects/{id}/resources/{res_id}` | 删除资源 | 是 |
| POST | `/projects/{id}/ai-breakdown` | AI 拆解任务 | 是 |

**项目模型**
| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | string | 项目 ID |
| title | string | 项目名 |
| description | string | 目标描述 |
| progress | number | 0-100 |
| status | string | active/paused/done |
| due_at | string | 截止时间 |

---

**7. 物品 Items（个人物品库）**

| 方法 | 路径 | 说明 | 鉴权 |
| --- | --- | --- | --- |
| GET | `/items` | 物品列表（筛选标签/分类） | 是 |
| POST | `/items` | 新建物品 | 是 |
| GET | `/items/{id}` | 物品详情 | 是 |
| PATCH | `/items/{id}` | 更新物品 | 是 |
| DELETE | `/items/{id}` | 删除物品 | 是 |
| POST | `/items/{id}/tags` | 添加标签 | 是 |
| DELETE | `/items/{id}/tags/{tag}` | 删除标签 | 是 |

**物品模型**
| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | string | 物品 ID |
| name | string | 物品名称 |
| description | string | 说明 |
| tags | string[] | 标签 |
| image_url | string | 图片 |
| category | string | 主题/徽章/装饰 |
| owned | boolean | 是否已拥有 |

---

**8. 积分 Points**

| 方法 | 路径 | 说明 | 鉴权 |
| --- | --- | --- | --- |
| GET | `/points/balance` | 当前积分 | 是 |
| GET | `/points/tasks` | 积分任务列表 | 是 |
| POST | `/points/tasks/{id}/claim` | 领取积分 | 是 |
| GET | `/points/transactions` | 积分流水 | 是 |
| POST | `/points/check-in` | 每日签到 | 是 |
| POST | `/points/share-progress` | 分享进度记录 | 是 |

**积分任务模型**
| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | string | 任务 ID |
| title | string | 任务名称 |
| reward | number | 奖励积分 |
| status | string | todo/done/claimed |
| progress | number | 进度 0-100 |

---

**9. 积分商城 Shop**

| 方法 | 路径 | 说明 | 鉴权 |
| --- | --- | --- | --- |
| GET | `/shop/items` | 商城商品 | 是 |
| GET | `/shop/items/{id}` | 商品详情 | 是 |
| POST | `/shop/redeem` | 兑换商品 | 是 |
| GET | `/shop/redemptions` | 兑换记录 | 是 |
| GET | `/shop/redemptions/{id}` | 兑换结果 | 是 |

**兑换请求**
```json
{
  "item_id": "s_1"
}
```

---

**10. 成就 Trophy Room**

| 方法 | 路径 | 说明 | 鉴权 |
| --- | --- | --- | --- |
| GET | `/achievements` | 成就列表 | 是 |
| GET | `/achievements/{id}` | 成就详情 | 是 |
| POST | `/achievements/{id}/share` | 生成分享链接 | 是 |
| GET | `/achievements/share/{share_id}` | 公开分享页数据 | 否 |

**成就模型**
| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | string | 成就 ID |
| title | string | 标题 |
| desc | string | 简述 |
| unlocked | boolean | 是否解锁 |
| progress | number | 进度 |
| rarity | string | 稀有度 |
| image_url | string | 图片 |

---

**11. 文件上传**

| 方法 | 路径 | 说明 | 鉴权 |
| --- | --- | --- | --- |
| POST | `/uploads` | 上传图片/文件 | 是 |

**上传方式**
- `multipart/form-data` 字段 `file`

**上传响应**
```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "file_id": "f_123",
    "url": "https://...",
    "width": 800,
    "height": 600
  }
}
```

---

**说明**
- 以上接口为当前前端页面所需的最小覆盖，字段可根据产品进一步细化。
- 若后端希望统一风格，可在现有结构上增加 trace_id、request_id 等字段。

---

**12. AI 配置**

| 方法 | 路径 | 说明 | 鉴权 |
| --- | --- | --- | --- |
| GET | `/ai/models` | 获取支持的模型列表 | 否 |
| GET | `/ai/config` | 获取当前用户 AI 配置 | 是 |
| POST | `/ai/config` | 保存用户 AI 配置（provider/model/key） | 是 |
| POST | `/ai/summary` | 文本摘要 | 是 |
| POST | `/ai/extract` | 提取要点 | 是 |
| POST | `/ai/quiz` | 生成测验 | 是 |

**配置请求**
```json
{
  "provider": "openai",
  "model": "gpt-4o-mini",
  "api_key": "sk-..."
}
```
