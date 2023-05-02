package org.infpls.royale.server.game.session.game;

import org.infpls.royale.server.game.session.Packet;

public class PacketGGM extends Packet {
  public final String name, data;
  public final String color;
  public PacketGGM(String name, String data, String color) {
    super("ggm");
    this.name = name;
    this.data = data;
    this.color = color;
  }
}