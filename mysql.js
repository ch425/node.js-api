const MySql = require('mysql'); //引入mysql模块
var mysql = MySql.createConnection({ //创建mysql实例
	host: '139.155.73.51',
	port: '33062',
	user: 'root',
	password: '123456',
	database: 'test_data'
});
//创建一个mysql
mysql.connect(function (err) {
	if (err) {
		console.log('[query] - 失败:' + err);
		return;
	}
	console.log('[mysql connect]  succeed! 成功');
});

function insertUser(params) {
	if (!params)
		return {
			status: 500,
			data: null,
			msg: '参数不能为空'
		}
	return new Promise((resolve, reject) => {
		console.log(params.username)
		var sql = "SELECT * FROM user_info WHERE username = '" + params.username + "'";
		mysql.query(sql, function (err, data) {
			if (err) {
				console.log('查询数据失败', err, data);
				// mysql.end();
				resolve({
					status: 500,
					data: null,
					msg: '操作失败'
				})
			} else {
				console.log(JSON.stringify(data[0]))
				if (data.length > 0) {
					resolve({
						status: 500,
						data: '',
						msg: '该用户已被注册'
					})
					// mysql.end();
				} else {
					mysql.query('INSERT INTO user_info SET  ?', params, function (err, data) {
						if (err) {
							// console.log('插入数据失败')			 
							// mysql.end();
							resolve({
								status: 500,
								data: null,
								msg: '添加失败'
							})
						} else {
							// console.log('插入数据成功');
							// mysql.end();
							resolve({
								status: 200,
								data: null,
								msg: '添加成功'
							})
						}
					})
				}
			}
		})
	})
}

function queryUser(params) {
	if (!params) {
		return {
			status: 500,
			data: '参数不能为空'
		}
	}
	return new Promise((resolve, reject) => {
		var sql = "SELECT * FROM user_info WHERE username = '" + params.username + "'" + " = '" + params.password + "'";
		mysql.query(sql, function (err, data) {
			if (err) {
				console.log('查询数据失败',err);
				// mysql.end();
				resolve({
					status: 500,
					data: null,
					msg: '操作失败'
				})
			} else {
				console.log(data)
				// mysql.end();
				resolve({
					tatus: 200,
					data: null,
					msg: '操作成功'
				})
			}
		})
		// mysql.end();
	})
}

module.exports = {
	queryUser, // 查询用户信息
	insertUser, // 添加用户信息
}