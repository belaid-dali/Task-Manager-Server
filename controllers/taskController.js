const User = require('../databases/model/user.model');
const Task = require('../databases/model/task.model');

const addTask = async (req, res) => {
    const { task, id } = req.body;

    try {
        if (!task) {
            return res.status(400).send('Please enter the task.');
        }
        if (task.length < 10) {
            return res.status(400).send('Task should be at least 10 characters long.');
        }
        const taskDetail = new Task({
            task,
            createdBy: id, // Ensure this field name matches your model
        });
        await taskDetail.save();
        return res.status(200).send(taskDetail);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send('Task addition failed.');
    }
};


const getAllTasks = async (req, res) => {
	const { id } = req.query;
	try {
		let tasklist = await Task.find({ cretedBy: id });
		return res.status(200).send(tasklist);
	} catch (error) {
		return res.status(400).send(error);
	}
};

const editTask = async (req, res) => {};

const statusChange = async (req, res) => {
    const { id, string } = req.body;

    try {
        let task = await Task.findById(id); 
        if (!task) {
            return res.status(404).send('Task not found.');
        }

        if (string === 'right') {
            switch (task.status) {
                case 'backlog':
                    task.status = 'todo';
                    break;
                case 'todo':
                    task.status = 'doing';
                    break;
                case 'doing':
                    task.status = 'done';
                    break;
                default:
                    return res.status(400).send('Invalid task status.');
            }
        } else if (string === 'left') {
            switch (task.status) {
                case 'done':
                    task.status = 'doing';
                    break;
                case 'doing':
                    task.status = 'todo';
                    break;
                case 'todo':
                    task.status = 'backlog';
                    break;
                default:
                    return res.status(400).send('Invalid task status.');
            }
        } else {
            return res.status(400).send('Invalid direction string.');
        }

        await task.save();
        return res.status(200).send(task);
    } catch (error) {
        console.error(error); 
        return res.status(500).send('Failed to change task status.');
    }
};


const deleteTask = async (req, res) => {
	const { id } = req.params;
	try {
		let response = await Task.findByIdAndDelete(id);
		return res.status(200).send(response);
	} catch (error) {
		return res.status(400).send('deleteFailed');
	}
};

module.exports = {
	addTask,
	getAllTasks,
	editTask,
	statusChange,
	deleteTask,
};