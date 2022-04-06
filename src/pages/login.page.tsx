import { Link } from 'react-router-dom'
import { Alert, Button, Checkbox, Form, Input, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

import { useTypedStoreActions, useTypedStoreState } from '../store/hooks'

interface LoginValues {
    username: string
    password: string
    remember: boolean
}

const labelCol = {
    sm: {span: 4, offset: 0},
    md: {span: 3, offset: 1},
    lg: {span: 3, offset: 1},
    xl: {span: 3, offset: 0},
    xxl: {span: 3, offset: 0}
}

const wrapperCol = {
    sm: {span: 20, offset: 0},
    md: {span: 14, offset: 1},
    lg: {span: 10, offset: 0},
    xl: {span: 10, offset: 0},
    xxl: {span: 12, offset: 0}
}

const itemsCol = {
    sm: {span: 20, offset: 4},
    md: {span: 14, offset: 5},
    lg: {span: 10, offset: 4},
    xl: {span: 10, offset: 3},
    xxl: {span: 12, offset: 3}
}

const LoginPage = () => {
    const {error} = useTypedStoreState(state => state.global)
    const {setError} = useTypedStoreActions(actions => actions.global)
    const {login} = useTypedStoreActions(actions => actions.auth)

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
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            initialValues={{remember: true}}
            onFinish={onFinish}
        >
            <Typography.Title>
                Sign in to the application
            </Typography.Title>

            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {required: true, message: 'Please input your username!'},
                    {whitespace: true, message: 'Username can not contain whitespaces'}
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {required: true, message: 'Please input your password!', whitespace: true},
                    {whitespace: true, message: 'Password can not contain whitespaces'}
                ]}
                className={error ? 'form__password--withError' : 'form__password'}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                    autoComplete="none"
                />
            </Form.Item>

            {
                error &&
                <Form.Item
                    wrapperCol={itemsCol}
                    className="form__error"
                >
                    <Alert message={error} type="error"/>
                </Form.Item>
            }

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={itemsCol}
                className="form__remember"
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={itemsCol}
                className="form__linking"
            >
                <Typography.Text>Haven't account yet? <Link to="/signup">Sign up</Link></Typography.Text>
            </Form.Item>


            <Form.Item wrapperCol={itemsCol}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export { LoginPage }