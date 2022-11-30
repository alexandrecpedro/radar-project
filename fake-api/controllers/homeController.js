module.exports = {
    index: (req, res, next) => {
        res.render('index', { title: 'Bem-vindo ao projeto Radar' });
    }
}