#version 330 core

out vec4 r_color;

uniform vec4 u_solid_color;

void main() {
	r_color = u_solid_color;
}

/**
*	stencil test -- 模板测试
*	测试通过 -- 保留片段 -- 进入深度测试
*	测试失败 -- 丢弃片段
*	模板测试在 frag_shader 执行完之后执行
*	模板测试在 深度测试 执行之前执行
*	glEnable(GL_STENCIL_TEST);			-- 启用模板测试
*	glStencilMask(0xff);				-- 在写入模板缓冲之前会与此函数的参数进行 AND 运算
*										-- 0xff 保持原样 可以写入; 0x00 变为0 禁止写入
*	glStencilFunc(GLenum func, GLint ref, GLuint mask);
*	glStencilFunc(GL_EQUAL, 1, 0xff);	-- 模板测试函数
*										-- func -- 模板测试函数 -- 比较当前模板缓冲中的值 和 ref 的方式
*										-- ref  -- 参考值 -- 用于与当前模板缓冲中的值比较 -- 看是否满足 func
*										-- mask -- 在模板缓冲中的值与参考值作比较之前分别对其作 AND 运算
*										-- 模板测试函数确定了当前模板缓冲中的值是否会通过测试
*
*	glStencilOp(GLenum sfail, GLenum dpfail, GLenum dppass);	-- 模板操作函数
*	glStencilOp(GL_KEEP, GL_KEEP, GL_KEEP);		-- 默认值 -- 保留原值 -- 不会更新模板缓冲
*										-- sfail  -- 模板测试失败时采取的行为
*										-- dpfail -- 模板测试通过，但深度测试失败时采取的行为
*										-- dppass -- 模板测试通过，且深度测试通过时采取的行为
*										-- 主要的行为有
*											-- GL_KEEP		-- 保持原值
*											-- GL_ZERO		-- 置为 0
*											-- GL_REPLACE	-- 置为 glStencilFunc函数的 ref 值
*											-- GL_INVERT	-- 翻转原值
*											-- GL_INCR		-- 小于最大值时 +1
*											-- GL_DECR		-- 大于最小值时 -1
*											-- GL_INCR_WRAP	-- 小于最大值时 +1 且 超过了最大值时置0
*											-- GL_DECR_WRAP	-- 大于最小值时 -1 且 小于0时置为最大值
*
*/