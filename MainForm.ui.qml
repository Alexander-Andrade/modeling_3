import QtQuick 2.4
import QtQuick.Controls 1.3
import QtQuick.Layouts 1.1

import "queuingSystem.js" as Qs

Item {
    id: topElement
    width: 500
    height: 400
    transformOrigin: Item.Center
    z: 0
    property alias chanel1Text: chanel1Text
    property alias buttonGo:buttonGo
    property alias chanel2Text: chanel2Text
    property alias clockText: clockText

    property alias queueLength: queueLength
    property alias lockProbability: lockProbability

    TextEdit {
        id: variantName
        x: 387
        y: 233
        width: 105
        height: 35
        text: qsTr("variant 5")
        font.bold: true
        font.pixelSize: 24

    }

    Button {
        id: buttonGo
        x: 391
        y: 316
        width: 96
        height: 76
        text: qsTr("Go")
        isDefault: false
        activeFocusOnPress: false



 }


    Image {
        id: image1
        x: 14
        y: 8
        width: 473
        height: 175
        source: "painting.PNG"
    }

    Rectangle {
        id: ioRect
        x: 14
        y: 189
        width: 364
        height: 203
        color: "#fdf782"

        Row {
            id: clockBlock
            x: 20
            y: 219
            anchors.top: chanels.bottom
            anchors.topMargin: 30

            Label {
                id: clockLabel
                text: qsTr("clock: ")
                font.family: "Times New Roman"
                font.pointSize: 14
            }

            TextEdit {
                id: clockText
                width: 80
                height: 20
                color: "#da2929"
                text: qsTr("1000")
                font.bold: true
                font.family: "Times New Roman"
                horizontalAlignment: Text.AlignHCenter
                cursorVisible: false
                font.pixelSize: 14
            }
    }

        Grid {
            id: chanels
            x: 17
            y: 137
            anchors.top: researchPorposes.bottom
            anchors.topMargin: 25
            anchors.left: parent.left
            anchors.leftMargin: 20
            rows: 2
            columns: 2

            Label {
                id: chanel1Label
                text: qsTr("chanel1:pi ")
                font.family: "Times New Roman"
                font.pointSize: 14
            }

            TextInput {
                id: chanel1Text
                width: 80
                height: 20
                color: "#da2929"
                text: qsTr("0.75")
                font.bold: true
                font.family: "Times New Roman"
                selectionColor: "#94276f"
                horizontalAlignment: Text.AlignHCenter
                font.pixelSize: 14

            }

            Label {
                id: chanel2Label
                text: qsTr("chanel2:pi ")
                font.family: "Times New Roman"
                font.pointSize: 14
            }


            TextInput {
                id: chanel2Text
                width: 80
                height: 20
                color: "#da2929"
                text: qsTr("0.6")
                font.bold: true
                font.family: "Times New Roman"
                selectionColor: "#94276f"
                clip: false
                horizontalAlignment: Text.AlignHCenter
                font.pixelSize: 14
}
    }

        Column {
            id: researchPorposes
            x: 17
            y: 40
            anchors.top: parent.top
            anchors.topMargin: 24
            anchors.left: parent.left
            anchors.leftMargin: 20

            Label {
                id: queueLength
                text: qsTr("queue Length:")
                font.family: "Times New Roman"
                font.pointSize: 14

            }

            Label {
                id: lockProbability
                text: qsTr("lock Probability: ")
                font.family: "Times New Roman"
                font.pointSize: 14
            }
    }
    }


}
