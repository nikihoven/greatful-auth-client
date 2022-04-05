import { Alert, Button, Checkbox, Form, Input, Typography } from 'antd'

import { FieldData } from 'rc-field-form/lib/interface.d'
import { useTypedStoreActions, useTypedStoreState } from '../store/hooks'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface SignupValues {
    nickname: string
    password: string
    confirmPassword: string
    remember: boolean
}

const SignupPage = () => {
    const {error} = useTypedStoreState(state => state.auth)
    const [disabled, setDisabled] = useState<boolean>(true)

    const {signup} = useTypedStoreActions(actions => actions.auth)

    const changeHandler = (_: any, allFields: FieldData[]) => {
        allFields
            .map(f => (!f.errors?.length && f.value && f.value?.length) || f.name.toString() === 'remember')
            .reduce((prev, curr) => prev && curr, true) ? setDisabled(false) : setDisabled(true)
    }

    const onFinish = (values: SignupValues) => {
        const {nickname, password, confirmPassword, remember} = values

        if (!nickname || !password || !confirmPassword || password !== confirmPassword) {
            setDisabled(true)
            return
        }

        signup({nickname, password, remember})
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
            <Form.Item>
                <Typography.Title>Sign in to the application</Typography.Title>
            </Form.Item>

            <Form.Item
                name="nickname"
                label="Nickname"
                tooltip="What do you want others to call you?"
                rules={[
                    {required: true, message: 'Please input your nickname!', whitespace: true},
                    {min: 6, message: 'The nickname must be longer than 6 characters'},
                    {max: 32, message: 'The nickname must be shorter than 32 characters'}
                ]}
            ><Input/></Form.Item>


            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {required: true, message: 'Please input your password!'},
                    {min: 6, message: 'The password must be longer than 6 characters'},
                    {max: 32, message: 'The password must be shorter than 32 characters'}
                ]}
                hasFeedback
            ><Input.Password autoComplete="off"/></Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {required: true, message: 'Please confirm your password!'},
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
            ><Input.Password autoComplete="off"/></Form.Item>

            <Form.Item wrapperCol={{offset: 4}}>
                <Typography.Text>Already have account? <Link to="/signup">Log in</Link></Typography.Text>
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
                <Button type="primary" htmlType="submit" disabled={disabled}>
                    Register
                </Button>
            </Form.Item>
        </Form>
    )
}

export { SignupPage }