import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import React, { Suspense } from 'react'
import Lights from './Lights'
import IPhone from './IPhone'
import Loader from './Loader'
import * as THREE from 'three'

const ModelView = (props) => {
    return (
        <View
            index={props.index}
            id={props.gsapType}
            className={`w-full h-full absolute ${props.index === 2 ? 'right-[-100%]' : '' }`}
        >
            {/* Ambient Light */}
            <ambientLight intensity={0.3} />

            <PerspectiveCamera makeDefault position={[0, 0, 4]} />

            <Lights />

            <OrbitControls 
                makeDefault
                ref={props.controlRef}
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.4}
                target0={new THREE.Vector3(0,0,0)}
                onEnd={() => props.setRotationState(props.controlRef.current.getAzimuthalAngle())}
            />

            <group 
                ref={props.groupRef} 
                name={`${props.index === 1 ? 'small' : 'large'}`} 
                position={[0, 0, 0]}
            >
                <Suspense fallback={<Loader />}>
                    <IPhone 
                        scale={props.index === 1 ? [15, 15, 15] : [17, 17, 17]}
                        item={props.item}
                        size={props.size}
                    />
                </Suspense>
            </group>
        </View>
    )
}

export default ModelView