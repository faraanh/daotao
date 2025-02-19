const Form = require('../models/Form');
const FormField = require('../models/FormField');
const FormResponse = require('../models/FormResponse');

// ✅ API: Admin tạo Form
exports.createForm = async (req, res) => {
    try {
        console.log('Request received:', req.body); // 🔹 Log request đầu vào

        const { notificationId, name, fields } = req.body;
        if (!notificationId || !name || !fields || fields.length === 0) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        const form = await Form.create({ notificationId, name });
        console.log('Form created:', form); // 🔹 Log form mới tạo

        for (const field of fields) {
            console.log('Creating field:', field); // 🔹 Log từng field
            await FormField.create({
                formId: form.id,
                label: field.label,
                type: field.type,
                required: field.required
            });
        }

        res.status(201).json({ message: 'Form created successfully.', form });
    } catch (error) {
        console.error('❌ Error creating form:', error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


// ✅ API: Admin lấy danh sách Forms của 1 thông báo
exports.getFormsByNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const forms = await Form.findAll({
            where: { notificationId },
            include: [{ model: FormField }] // 🔹 Lấy cả danh sách fields của từng form
        });

        res.json(forms);
    } catch (error) {
        console.error('❌ Error fetching forms:', error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


// ✅ API: Lấy danh sách Fields của 1 Form
exports.getFormFields = async (req, res) => {
    try {
        const { formId } = req.params;
        const fields = await FormField.findAll({ where: { formId } });
        res.json(fields);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

// ✅ API: User gửi phản hồi Form
exports.submitFormResponse = async (req, res) => {
    try {
        const { formId, responseData } = req.body;
        const userId = req.user.id;

        const response = await FormResponse.create({
            formId,
            userId,
            responseData: JSON.stringify(responseData)
        });

        res.status(201).json({ message: 'Response submitted successfully.', response });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};
