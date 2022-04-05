import { Alert, Button, Checkbox, Form, Input, Typography } from 'antd'
import { Link } from 'react-router-dom'

import { useTypedStoreActions, useTypedStoreState } from '../store/hooks'

interface LoginValues {
    nickname: string
    password: string
    remember: boolean
}

const LoginPage = () => {
    const {error} = useTypedStoreState(state => state.auth)
    const {login, setError} = useTypedStoreActions(actions => actions.auth)

    const onFinish = (values: LoginValues) => {
        const {nickname, password, remember} = values
        if (!nickname || !password) {
            setError('Fill in all the fields!')
            return
        }

        login({nickname, password, remember})
    }

    return (
        <Form
            name="basic"
            labelCol={{span: 3}}
            wrapperCol={{span: 10, offset: 1}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item>
                <Typography.Title>Register in the application</Typography.Title>
            </Form.Item>

            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
                style={{marginBottom: 0}}
            >
                <Input.Password autoComplete="none"/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 4}}>
                <Typography.Text>Haven't account yet? <Link to="/signup">Sign up</Link></Typography.Text>
            </Form.Item>

            {
                error &&
                <Form.Item wrapperCol={{offset: 4, span: 10}}>
                    <Alert message={error} type="error"/>
                </Form.Item>
            }

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 4, span: 10}}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 4, span: 10}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export { LoginPage }