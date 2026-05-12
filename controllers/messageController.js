const messageCreateGet = (req, res) => res.render("messages/create", { title: "Create Message", message: req.message });

export default { messageCreateGet };