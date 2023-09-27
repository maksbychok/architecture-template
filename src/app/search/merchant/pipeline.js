module.exports = () => {
	let data = null;
	const handler = 'handler';
    let pipes = [];
    return {
        send(d){
            data = d;
            return this;
        },
        through(p){
            pipes = p;
            return this;
        },
        process(){
            return pipes.reduce((d, { [handler]:h }) => h(d), data)
        },
        then(callback){
            return callback(data);
        }
    };
}