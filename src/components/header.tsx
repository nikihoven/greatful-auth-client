import { Link } from 'react-router-dom'
import { Col, Menu, Row, Typography } from 'antd'
import { Header as Hdr } from 'antd/es/layout/layout'

import { useTypedStoreActions, useTypedStoreState } from '../store/hooks'

const Header = () => {
    const {accessToken} = useTypedStoreState(state => state.auth)
    const {globalLoading} = useTypedStoreState(state => state.global)
    const {logout} = useTypedStoreActions(actions => actions.auth)

    return (
        <Hdr>
            <Row justify="space-between">
                <Col>
                    <Row align="middle">
                        <Typography.Title className="header__logotype">Application</Typography.Title>
                    </Row>
                </Col>
                <Col>
                    <Menu theme="dark" mode="horizontal">
                        {
                            globalLoading
                                ?
                                null
                                :
                                (
                                    accessToken
                                        ?
                                        <>
                                            <Menu.Item key="users">
                                                <Link to="/">Users</Link>
                                            </Menu.Item>
                                            <Menu.Item key="logout" onClick={() => logout()}>
                                                Logout
                                            </Menu.Item>
                                        </>
                                        :
                                        <>
                                            <Menu.Item key="login">
                                                <Link to="/login">Log in</Link>
                                            </Menu.Item>
                                            <Menu.Item key="signup">
                                                <Link to="/signup">Sign up</Link>
                                            </Menu.Item>
                                        </>
                                )
                        }
                    </Menu>
                </Col>
            </Row>

        </Hdr>
    )
}

export { Header }