import { Request, Response } from "express";
import userService from "../../services/users/users.service";

/**
 * @class userController to manage users in the database and return the response
 */
export class userController {
	/**
	 * method controller to create a new user
	 *
	 * @param req
	 * @param res
	 * @returns
	 */
	async createUser(req: Request, res: Response) {
		try {
			const usersService = new userService();

			if (
				!req.body.email ||
				!req.body.password ||
				!req.body.username ||
				!req.body.lastName ||
				!req.body.phoneNumber
			) {
				return res.status(400).json({
					origin: "userController -> createUser",
					errorMessage: "Missing required fields",
				});
			}

			await usersService.createProfile(req, res);
		} catch (error) {
			res.status(500).json({
				origin: "userController -> createUser",
				errorMessage: `${error}`,
			});
		}
	}

	/**
	 *
	 * this method is used to login a user
	 *
	 * @param req
	 * @param res
	 * @returns
	 */
	async loginUser(req: Request, res: Response) {
		try {
			const usersService = new userService();

			if (!req.body.email || !req.body.password) {
				return res.status(400).json({
					origin: "userController -> loginUser",
					errorMessage: "Missing required fields",
				});
			}

			await usersService.loginUser(req, res);
		} catch (error) {
			res.status(500).json({
				origin: "userController -> loginUser",
				errorMessage: `${error}`,
			});
		}
	}

	/**
	 * this controller is used to view the profile of a user
	 *
	 * @param req
	 * @param res
	 * @returns
	 */
	async viewProfile(req: Request, res: Response) {
		try {
			const usersService = new userService();
			console.log(req.params.userId);

			if (!req.params.userId) {
				return res.status(400).json({
					origin: `userController -> viewProfile`,
					error: "El id del usuario es requerido.",
				});
			}

			await usersService.viewProfile(req, res);
		} catch (error) {
			res.status(500).json({
				origin: "userController -> viewProfile",
				errorMessage: `${error}`,
			});
		}
	}

	/**
	 * this controller is used to view the chats of a user
	 *
	 * @param req
	 * @param res
	 * @returns
	 */
	async viewChatsUser(req: Request, res: Response) {
		try {
			const usersService = new userService();

			if (!req.params.userId) {
				return res.status(400).json({
					origin: `userController -> viewChatsUser`,
					error: "El id del usuario es requerido.",
				});
			}

			await usersService.viewChatsUser(req, res);
		} catch (error) {
			res.status(500).json({
				origin: "userController -> viewChatsUser",
				errorMessage: `${error}`,
			});
		}
	}

	/**
	 *
	 * this controller is used to view one chat of a user
	 * @param req
	 * @param res
	 */
	async viewOneChat(req: Request, res: Response) {
		try {
			const usersService = new userService();

			if (!req.params.userId && !req.params.chatId) {
				return res.status(400).json({
					origin: `userController -> viewOneChat ${req.params.userId} ${req.params.chatId}`,
					error: "El id del usuario o el chatId es requerido.",
				});
			}

			await usersService.viewOneChat(req, res);
		} catch (error) {
			res.status(500).json({
				origin: "userController -> viewOneChat",
				errorMessage: `${error}`,
			});
		}
	}

	/**
	 *
	 * this controller is used to create a chat to user
	 *
	 * @param req
	 * @param res
	 */
	async createChat(req: Request, res: Response) {
		try {
			const usersService = new userService();
			if (!req.params.userId) {
				return res.status(400).json({
					origin: `userController -> createChat ${req.body.userId}`,
					error: "El id del usuario es requerido.",
				});
			}

			await usersService.createChat(req, res);
		} catch (error) {
			res.status(500).json({
				origin: "userController -> createChat",
				errorMessage: `${error}`,
			});
		}
	}

	/**
	 *
	 * this controller is used to write and conversate with the AI
	 *
	 * todo: test g4fs or use GTP4/GPT3.5
	 *
	 * @param req
	 * @param res
	 */
	async conversationAI(req: Request, res: Response) {
		try {
			const usersService = new userService();

			if (!req.params.userId || !req.body.queryMessage) {
				return res.status(400).json({
					origin: `userController -> queryChat ${req.params.userId}`,
					error: "El id del usuario o el body message es requerido.",
				});
			}

			await usersService.conversationAI(req, res);
		} catch (error) {
			res.status(500).json({
				origin: "userController -> queryChat",
				errorMessage: `${error}`,
			});
		}
	}

	/**
	 *
	 * this controller is used to create a directory to user
	 *
	 * @param req
	 * @param res
	 * @returns
	 */
	async createDirectoryFiles(req: Request, res: Response) {
		try {
			const usersService = new userService();

			if (!req.params.userId) {
				return res.status(400).json({
					origin: `userController -> createDirectoryFiles ${req.params.userId}`,
					error: "El id del usuario es requerido.",
				});
			}

			if (!req.body) {
				return res.status(400).json({
					origin: `userController -> createDirectoryFiles ${req.params.userId}`,
					error: "El body del directory a crear requerido.",
				});
			}

			await usersService.createDirectoryFiles(req, res);
		} catch (error) {
			res.status(500).json({
				origin: "userController -> createDirectoryFiles",
				errorMessage: `${error}`,
			});
		}
	}

	/**
	 *
	 * method to view all directories of a user
	 *
	 * @param req
	 * @param res
	 */
	async viewDirectoriesByUser(req: Request, res: Response) {
		try {
			const usersService = new userService();

			if (!req.params.userId) {
				return res.status(400).json({
					origin: `userController -> viewDirectoriesByUser ${req.params.userId}`,
					error: "El id del usuario es requerido.",
				});
			}

			await usersService.viewDirectoriesByUser(req, res);
		} catch (error) {
			res.status(500).json({
				origin: "userController -> viewDirectoriesByUser",
				errorMessage: `${error}`,
			});
		}
	}

	/**
	 *
	 * method to show all users in the database
	 *
	 * @param req
	 * @param res
	 * @returns users in the database
	 */
	async showUsers(req: Request, res: Response) {
		try {
			const usersService = new userService();

			await usersService.showUsers(req, res);
		} catch (error) {
			res.status(500).json({
				origin: "userController -> showUsers",
				errorMessage: `${error}`,
			});
		}
	}

	/**
	 *
	 * method to update a profile
	 *
	 * @param req
	 * @param res
	 * @returns profile updated
	 */
	async updateProfile(req: Request, res: Response) {
		try {
			const usersService = new userService();
			const { userId } = req.params;

			if (!userId) {
				return res.status(400).json({
					origin: `userController -> updateProfile ${req.params.userId}`,
					error: "El id del usuario es requerido.",
				});
			}

			await usersService.showUsers(req, res);
		} catch (error) {
			res.status(500).json({
				origin: "userController -> showUsers",
				errorMessage: `${error}`,
			});
		}
	}

	/**
	 *
	 * method to generate an invitation to collaborate
	 *
	 * @param req
	 * @param res
	 * @returns invitation generated
	 */
	async generateInvitationCollaborator(req: Request, res: Response) {
		try {
			const usersService = new userService();
			const { userId, chatId } = req.params;
			const { emailCollaborator } = req.body;

			if (!userId || !chatId) {
				return res.status(400).json({
					origin: `userController -> generateInvitationCollaborator ${req.params.userId}`,
					error: "El id del usuario o el chatId es requerido.",
				});
			}

			if (!emailCollaborator) {
				return res.status(400).json({
					origin: `userController -> generateInvitationCollaborator ${req.params.userId}`,
					error: "El email del colaborador es requerido.",
				});
			}

			await usersService.generateInvitationCollaborator(req, res);
		} catch (error) {
			res.status(500).json({
				origin: "userController -> showUsers",
				errorMessage: `${error}`,
			});
		}
	}

	/**
	 *
	 * this service is used to validate a invitation token
	 *
	 * @param req
	 * @param res
	 * @returns true or false
	 */
	async validateTokenInvitation(req: Request, res: Response) {
		try {
			const usersService = new userService();

			if (!req.params.token) {
				return res.status(400).json({
					origin: `userController -> validateTokenInvitation ${req.params.userId}`,
					error: "El token de invitación es requerido.",
				});
			}

			await usersService.validateInvitationCollaborator(req, res);
		} catch (error) {
			res.status(500).json({
				origin: "userController -> showUsers",
				errorMessage: `${error}`,
			});
		}
	}

	/**
	 *
	 * this service is used to assign permissions to a collaborator
	 *
	 * @param req
	 * @param res
	 * @returns true or false
	 */
	async assignPermissions(req: Request, res: Response) {
		try {
			const usersService = new userService();

			if (!req.params.userId || !req.params.chatId || !req.body.Isreadonly) {
				return res.status(400).json({
					origin: `userController -> assignPermissions ${req.params.userId}`,
					error: "we need userId, chatId and isreadonly",
				});
			}

			await usersService.assignPermissions(req, res);
		} catch (error) {
			res.status(500).json({
				origin: "userController -> showUsers",
				errorMessage: `${error}`,
			});
		}
	}
}
