require(["parse",
		"ThreadModule/controller",
		"ThreadModule/model", 
		"ThreadModule/view",
		"CmtModule/controller",
		"CmtModule/model", 
		"CmtModule/view",
		"CtlModule/controller",
		"CtlModule/view"],
function(Parse, 
	ThreadController, ThreadsModel, ThreadsView, 
	CmtsController, CmtsModel, CmtsView,
	CtlController, CtlView) {
	Parse.initialize("jQqq8FB0WmBi258N857Elg7zyBQPibkNlmbDNBj6", "vNJIQZUdFd5aZcmHAtEsuWjiB4kY3tQvmaNJRQoU");

	/* Init  */
	var threadsView = new ThreadsView(null);
	var threadsModel = new ThreadsModel(null);
	var threadsControler = new ThreadController(threadsView, threadsModel, null);
	threadsView.controller = threadsControler;
	threadsModel.controller = threadsControler;

	var cmtView = new CmtsView(null);
	var cmtModel = new CmtsModel(null);
	var cmtsControler = new CmtsController(cmtView, cmtModel);
	cmtView.controller = cmtsControler;
	cmtModel.controller = cmtsControler;

	threadsControler.cmtController = cmtsControler;

	var ctlView = new CtlView(null);
	var ctlController = new CtlController(ctlView, cmtsControler, threadsControler);
	ctlView.controller = ctlController;

	/* Start */
	// threadsControler.getTheads();
	ctlController.view.onEvent();
	ctlController.loadTheadByNewComment();
});