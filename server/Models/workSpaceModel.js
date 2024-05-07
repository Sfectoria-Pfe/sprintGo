const mongoose = require('mongoose');
const workspaceSchema = mongoose.Schema(
	{
		
		
        title: {
            type: String,
            required: true,
        },
        borads: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'borad',
			},
		], 
        members: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'user',
				},
				name: {
					type: String,
				},
				surname: {
					type: String,
				},
				email: {
					type: String,
				},
				role: {
					type: String,
					default: 'member',
				},
				color: {
					type:String,
				}
			},
		],
        activity: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'user',
				},
				name: {
					type: String,
				},
				action: {
					type: String,
				},
				date: {
					type: Date,
					default: Date.now,
				},
				edited: {
					type: Boolean,
					default: false,
				},
				cardTitle: {
					type: String,
					default: '',
				},
				actionType: {
					type: String,
					default: 'action',
				},
				color: {
					type: String,
				},
			},
		],
} ,);
        module.exports = mongoose.model('workspace', workspaceSchema);