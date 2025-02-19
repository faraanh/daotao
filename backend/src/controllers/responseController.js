const Response = require('../models/Response');
const Notification = require('../models/Notification');
const { validationResult } = require('express-validator');
const excelJS = require('exceljs');

// Submit response
exports.submitResponse = async (req, res) => {
    const { notificationId, content, no_data } = req.body;
    const userId = req.user.id;

    try {
        const notification = await Notification.findByPk(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found.' });
        }

        const deadline = new Date(notification.deadline);
        if (new Date() > deadline) {
            return res.status(400).json({ message: 'The deadline for this notification has passed.' });
        }

        let response = await Response.findOne({ where: { notificationId, userId } });

        if (response) {
            await response.update({ content, no_data, updatedAt: new Date() });
            return res.json({ message: 'Response updated successfully.', response });
        } else {
            response = await Response.create({ notificationId, userId, content, no_data });
            return res.status(201).json({ message: 'Response submitted successfully.', response });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

exports.getResponsesByNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        let responses;
        if (userRole === 'admin') {
            // Nếu là admin, lấy tất cả phản hồi của thông báo
            responses = await Response.findAll({ where: { notificationId } });
        } else {
            // Nếu là user, chỉ lấy phản hồi của chính họ
            responses = await Response.findAll({ where: { notificationId, userId } });
        }

        res.json(responses);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};


// Export responses to Excel (Admin only)
exports.exportResponsesToExcel = async (req, res) => {
    try {
        const responses = await Response.findAll({ where: { notificationId: req.params.notificationId } });

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet('Responses');

        worksheet.columns = [
            { header: 'Response ID', key: 'id', width: 10 },
            { header: 'User ID', key: 'userId', width: 10 },
            { header: 'Notification ID', key: 'notificationId', width: 10 },
            { header: 'Content', key: 'content', width: 30 },
            { header: 'No Data', key: 'no_data', width: 10 },
            { header: 'Updated At', key: 'updatedAt', width: 20 }
        ];

        responses.forEach((response) => {
            worksheet.addRow(response.dataValues);
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=responses_${req.params.notificationId}.xlsx`
        );

        return workbook.xlsx.write(res).then(() => {
            res.end();
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};
