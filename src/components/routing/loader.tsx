import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const Loader = () => {

    return (
        <Spin
            style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />}
        />
    )
}

export { Loader }