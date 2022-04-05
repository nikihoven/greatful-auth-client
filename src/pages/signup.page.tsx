import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Checkbox, Form, Input, Typography } from 'antd'
import { FieldData } from 'rc-field-form/lib/interface.d'

import { useTypedStoreActions, useTypedStoreState } from '../store/hooks'

interface SignupValues {
    username: string
    password: string
    confirmPassword: string
    remember: boolean
}

const SignupPage = () => {
    const [disabled, setDisabled] = useState<boolean>(true)

    const {error} = useTypedStoreState(state => state.global)
    const {signup} = useTypedStoreActions(actions => actions.auth)

    const changeHandler = (_: any, allFields: FieldData[]) => {
        allFields
            .map(f => (!f.errors?.length && f.value && f.value?.length) || f.name.toString() === 'remember')
            .reduce((prev, curr) => prev && curr, true) ? setDisabled(false) : setDisabled(true)
    }

    const onFinish = (values: SignupValues) => {
        const {username, password, confirmPassword, remember} = values

        if (!username.trim() || !password.trim() || !confirmPassword.trim() || password !== confirmPassword) {
            setDisabled(true)
            return
        }

        signup({username: username.trim(), password: password.trim(), remember})
    }

    return (
        <Form
            name="basic"
            labelCol={{span: 3}}
            wrapperCol={{span: 10, offset: 1}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFieldsChange={changeHandler}
            autoComplete="off"
        >
            <Typography.Title>
                Register in the application
            </Typography.Title>


            <Form.Item
                name="username"
                label="Username"
                tooltip="What do you want others to call you?"
                rules={[
                    {required: true, message: 'Please input your username!', whitespace: true},
                    {min: 6, message: 'The username must be longer than 6 characters'},
                    {max: 32, message: 'The username must be shorter than 32 characters'}
                ]}
            >
                <Input/>
            </Form.Item>


            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {required: true, message: 'Please input your password!', whitespace: true},
                    {min: 6, message: 'The password must be longer than 6 characters'},
                    {max: 32, message: 'The password must be shorter than 32 characters'}
                ]}
                hasFeedback
            >
                <Input.Password autoComplete="off"/>
            </Form.Item>


            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {required: true, message: 'Please confirm your password!', whitespace: true},
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'))
                        }
                    })
                ]}
                style={{marginBottom: 0}}
            >
                <Input.Password autoComplete="off"/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 4}}>
                <Typography.Text>
                    Already have account? <Link to="/signup">Log in</Link>
                </Typography.Text>
            </Form.Item>

            {
                error &&
                <Form.Item wrapperCol={{offset: 4, span: 10}}>
                    <Alert message={error} type="error"/>
                </Form.Item>
            }

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 4, span: 10}}>
                <Checkbox>
                    Remember me
                </Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 4, span: 10}}>
                <Button type="primary" htmlType="submit" disabled={disabled}>
                    Register
                </Button>
            </Form.Item>
        </Form>
    )
}

export { SignupPage }