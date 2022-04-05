import { Link } from 'react-router-dom'
import { Alert, Button, Checkbox, Form, Input, Typography } from 'antd'

import { useTypedStoreActions, useTypedStoreState } from '../store/hooks'

interface LoginValues {
    username: string
    password: string
    remember: boolean
}

const LoginPage = () => {
    const {error} = useTypedStoreState(state => state.auth)
    const {login, setError} = useTypedStoreActions(actions => actions.auth)

    const onFinish = (values: LoginValues) => {
        const {username, password, remember} = values

        if (!username.trim() || !password.trim()) {
            setError('Fill in all the fields!')
            return
        }

        login({username: username.trim(), password: password.trim(), remember})
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
            <Typography.Title>
                Sign in to the application
            </Typography.Title>

            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {required: true, message: 'Please input your username!'},
                    {whitespace: true, message: 'Username can not contain whitespaces'},
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {required: true, message: 'Please input your password!', whitespace: true},
                    {whitespace: true, message: 'Password can not contain whitespaces'},
                ]}
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