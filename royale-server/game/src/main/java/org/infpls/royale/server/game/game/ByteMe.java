package org.infpls.royale.server.game.game;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.*;

public class ByteMe {
 
  public static List<NETX> decode(ByteBuffer data, short pid) throws IOException {
    final List<NETX> de = new ArrayList();
    while(data.remaining() > 0) {
      byte designation = data.get();
      switch(designation) {
        case 0x10 : { de.add(new NET010(pid, data)); break; }
        case 0x11 : { de.add(new NET011(pid, data)); break; }
        case 0x12 : { de.add(new NET012(pid, data)); break; }
        case 0x13 : { de.add(new NET013(pid, data)); break; }
        case 0x14 : { de.add(new NET014(pid, data)); break; }
        case 0x15 : { de.add(new NET015(pid, data)); break; }
        case 0x17 : { de.add(new NET017(pid, data)); break; }
        case 0x18 : { de.add(new NET018(pid, data)); break; }
        case 0x19 : { de.add(new NET019(pid, data)); break; }
        case 0x20 : { de.add(new NET020(pid, data)); break; }
        case 0x21 : { de.add(new NET021(pid, data)); break; }
        case 0x30 : { de.add(new NET030(pid, data)); break; }
        default : { throw new IOException("Invalid designation byte: " + designation); }
      }
    }
    return de;
  }
  
  public static ByteBuffer encode(List<NETX> nets) throws IOException {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    for(int i=0;i<nets.size();i++) {
      baos.write(nets.get(i).encode().array());
    }
    ByteBuffer bb = ByteBuffer.wrap(baos.toByteArray());
    baos.close();
    return bb;
  }
  
  public static abstract class NETX {
    public final byte designation;
    public final short pid;
    public NETX(byte designation, short pid) {
      this.designation = designation;
      this.pid = pid;
    }
    
    public abstract ByteBuffer encode();
  }
  
  
  /* Anti cheat... we change the designator for this packet occasionally to prevent old version cheats */
  public static class NET001 extends NETX {
    public NET001(short pid) {
      super((byte)0x02, pid);
    }
    
    @Override
    public ByteBuffer encode() {
      final ByteBuffer bb = ByteBuffer.allocate(3);
      bb.put(designation);
      bb.putShort(pid);
      return bb;
    }
  }
  
  public static class NET010 extends NETX {
    public final byte level, zone, character;
    public final int pos;             // shor2
    public NET010(short pid, ByteBuffer data) {
      super((byte)0x10, pid);
      level = data.get();
      zone = data.get();
      pos = data.getInt();
      character = data.get();
    }
    
    public NET010(short pid, byte level, byte zone, int pos, byte character) {
      super((byte)0x10, pid);
      this.level = level;
      this.zone = zone;
      this.pos = pos;
      this.character = character;
    }
    
    @Override
    public ByteBuffer encode() {
      final ByteBuffer bb = ByteBuffer.allocate(10);
      bb.put(designation);
      bb.putShort(pid);
      bb.put(level);
      bb.put(zone);
      bb.putInt(pos);
      return bb;
    }
  }
  
  public static class NET011 extends NETX {
    public NET011(short pid, ByteBuffer data) {
      super((byte)0x11, pid);
    }
    
    public NET011(short pid) {
      super((byte)0x11, pid);
    }
    
    @Override
    public ByteBuffer encode() {
      final ByteBuffer bb = ByteBuffer.allocate(3);
      bb.put(designation);
      bb.putShort(pid);
      return bb;
    }
  }
  
  public static class NET012 extends NETX {
    public final byte level, zone, character;
    public final Vec2 pos;             // Vec2
    public final short sprite;
    public final byte reverse;
    public NET012(short pid, ByteBuffer data) {
      super((byte)0x12, pid);
      level = data.get();
      zone = data.get();
      pos = new Vec2(data.getFloat(), data.getFloat());
      sprite = data.getShort();
      reverse=data.get();
      character = data.get();
    }
    
    @Override
    public ByteBuffer encode() {
      final ByteBuffer bb = ByteBuffer.allocate(17);
      bb.put(designation);
      bb.putShort(pid);
      bb.put(level);
      bb.put(zone);
      bb.putFloat(pos.x);
      bb.putFloat(pos.y);
      bb.putShort(sprite);
      bb.put(reverse);
      bb.put(character);
      return bb;
    }
  }
  
  
  public static class NET013 extends NETX {
    public final byte type;
    public NET013(short pid, ByteBuffer data) {
      super((byte)0x13, pid);
      type = data.get();
    }
    
    public NET013(short pid, byte t) {
      super((byte)0x13, pid);
      type = t;
    }
    
    @Override
    public ByteBuffer encode() {
      final ByteBuffer bb = ByteBuffer.allocate(4);
      bb.put(designation);
      bb.putShort(pid);
      bb.put(type);
      return bb;
    }
  }

  public static class NET014 extends NETX {
    public final byte emote;
    public NET014(short pid, ByteBuffer data) {
      super((byte)0x14, pid);
      emote = data.get();
    }
    
    public NET014(short pid, byte t) {
      super((byte)0x14, pid);
      emote = t;
    }
    
    @Override
    public ByteBuffer encode() {
      final ByteBuffer bb = ByteBuffer.allocate(4);
      bb.put(designation);
      bb.putShort(pid);
      bb.put(emote);
      return bb;
    }
  }
  
  public static class NET015 extends NETX {
    public NET015(short pid, ByteBuffer data) {
      super((byte)0x15, pid);
    }
    
    public NET015(short pid) {
      super((byte)0x15, pid);
    }
    
    @Override
    public ByteBuffer encode() {
      final ByteBuffer bb = ByteBuffer.allocate(3);
      bb.put(designation);
      bb.putShort(pid);
      return bb;
    }
  }
  
  public static class NET017 extends NETX {
    public final short killer;
    public NET017(short pid, ByteBuffer data) {
      super((byte)0x17, pid);
      killer = data.getShort();
    }
    
    public NET017(short pid, short k) {
      super((byte)0x17, pid);
      killer = k;
    }
    
    @Override
    public ByteBuffer encode() {
      final ByteBuffer bb = ByteBuffer.allocate(5);
      bb.put(designation);
      bb.putShort(pid);
      bb.putShort(killer);
      return bb;
    }
  }
  
  public static class NET018 extends NETX {
    public final byte result;
    public final byte extra;   // Anti cheat value. If set to 0x42 the client offsets result standings.
    public NET018(short pid, ByteBuffer data) {
      super((byte)0x18, pid);
      result = 0;
      extra = 0;
    }
    
    public NET018(short pid, byte r, boolean e) {
      super((byte)0x18, pid);
      result = r;
      extra = e?(byte)0x82:(byte)0x00;
    }
    
    @Override
    public ByteBuffer encode() {
      final ByteBuffer bb = ByteBuffer.allocate(5);
      bb.put(designation);
      bb.putShort(pid);
      bb.put(result);
      bb.put(extra);
      return bb;
    }
  }
  
  public static class NET019 extends NETX {
    public NET019(short pid, ByteBuffer data) {
      super((byte)0x19, pid);
    }
    
    public NET019(short pid) {
      super((byte)0x19, pid);
    }
    
    @Override
    public ByteBuffer encode() {
      final ByteBuffer bb = ByteBuffer.allocate(3);
      bb.put(designation);
      bb.putShort(pid);
      return bb;
    }
  }
  
  public static class NET020 extends NETX {
    public final byte level, zone;
    public final int oid;
    public final byte type;
    
    public NET020(short pid, ByteBuffer data) {
      super((byte)0x20, pid);
      level = data.get();
      zone = data.get();
      oid = data.getInt();
      type = data.get();
    }
    
    @Override
    public ByteBuffer encode() {
      final ByteBuffer bb = ByteBuffer.allocate(10);
      bb.put(designation);
      bb.putShort(pid);
      bb.put(level);
      bb.put(zone);
      bb.putInt(oid);
      bb.put(type);
      return bb;
    }
  }

  public static class NET021 extends NETX {
    public NET021(short pid, ByteBuffer data) {
      super((byte)0x21, pid);
    }
    
    public NET021(short pid) {
      super((byte)0x21, pid);
    }
    
    @Override
    public ByteBuffer encode() {
      final ByteBuffer bb = ByteBuffer.allocate(3);
      bb.put(designation);
      bb.putShort(pid);
      return bb;
    }
  }
    
  public static class NET030 extends NETX {
    public final byte level, zone;
    public final int pos;    //shor2
    public final byte type;
    
    public NET030(short pid, ByteBuffer data) {
      super((byte)0x30, pid);
      level = data.get();
      zone = data.get();
      pos = data.getInt();
      type = data.get();
    }
    
    @Override
    public ByteBuffer encode() {
      final ByteBuffer bb = ByteBuffer.allocate(10);
      bb.put(designation);
      bb.putShort(pid);
      bb.put(level);
      bb.put(zone);
      bb.putInt(pos);
      bb.put(type);
      return bb;
    }
  }
  
}
